import catalog from "@/data/products.json";
import type { BulkDiscountTier, Product } from "@/types/product";

const RAW = (catalog as { products?: unknown[] })?.products ?? [];

function toNumber(value: unknown, fallback = 0): number {
  const n = typeof value === "string" ? Number(value) : (value as number);
  return typeof n === "number" && Number.isFinite(n) ? n : fallback;
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function normalizeTiers(value: unknown): BulkDiscountTier[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const tiers: BulkDiscountTier[] = [];
  for (const raw of value) {
    if (!raw || typeof raw !== "object") continue;
    const t = raw as Record<string, unknown>;
    const minQty = toNumber(t["minQty"], 0);
    const unitPrice = toNumber(t["unitPrice"], NaN);
    if (minQty < 1 || !Number.isFinite(unitPrice)) continue;
    const maxRaw = t["maxQty"];
    const maxParsed = toNumber(maxRaw, NaN);
    tiers.push({
      minQty,
      maxQty: Number.isFinite(maxParsed) ? maxParsed : null,
      unitPrice,
      label: str(t["label"]),
    });
  }
  tiers.sort((a, b) => a.minQty - b.minQty);
  return tiers.length ? tiers : undefined;
}

function normalizeProduct(raw: unknown, index: number): Product | null {
  if (!raw || typeof raw !== "object") return null;
  const p = raw as Record<string, unknown>;
  const idRaw = p["id"];
  const id = idRaw !== undefined && idRaw !== null ? String(idRaw) : `auto-${index}`;
  const name = str(p["name"]);
  if (!name) return null;

  const price = toNumber(p["price"], 0);
  const promoRaw = toNumber(p["promoPrice"], NaN);
  const promoPrice =
    Number.isFinite(promoRaw) && promoRaw > 0 && promoRaw < price ? promoRaw : null;

  const image = str(p["image"]);
  const imagesRaw = p["images"];
  const images = Array.isArray(imagesRaw)
    ? imagesRaw.filter((i): i is string => typeof i === "string" && !!i)
    : [];
  const gallery = Array.from(new Set([...(image ? [image] : []), ...images]));

  const stockRaw = p["stock"];

  return {
    id,
    name,
    description: str(p["description"]),
    category: str(p["category"]),
    brand: str(p["brand"]),
    unit: str(p["unit"]),
    price,
    promoPrice,
    image: gallery[0],
    images: gallery,
    stock: stockRaw === undefined || stockRaw === null ? undefined : toNumber(stockRaw, 0),
    sku: str(p["sku"]),
    bulkDiscountTiers: normalizeTiers(p["bulkDiscountTiers"]),
  };
}

export const PRODUCTS: Product[] = RAW.map(normalizeProduct).filter(
  (p): p is Product => p !== null,
);

const PRODUCT_MAP = new Map(PRODUCTS.map((p) => [p.id, p]));

export function getProductById(id: string): Product | undefined {
  return PRODUCT_MAP.get(id);
}

export const CATEGORIES: string[] = Array.from(
  new Set(PRODUCTS.map((p) => p.category).filter((c): c is string => !!c)),
).sort((a, b) => a.localeCompare(b, "pt-BR"));

export const BRANDS: string[] = Array.from(
  new Set(PRODUCTS.map((p) => p.brand).filter((b): b is string => !!b)),
).sort((a, b) => a.localeCompare(b, "pt-BR"));

const range = PRODUCTS.reduce(
  (acc, p) => {
    const value = p.promoPrice ?? p.price;
    return { min: Math.min(acc.min, value), max: Math.max(acc.max, value) };
  },
  { min: Infinity, max: 0 },
);

export const PRICE_RANGE = {
  min: Number.isFinite(range.min) ? Math.floor(range.min) : 0,
  max: range.max > 0 ? Math.ceil(range.max) : 1000,
};
if (PRICE_RANGE.max <= PRICE_RANGE.min) PRICE_RANGE.max = PRICE_RANGE.min + 1000;

export const OFFERS: Product[] = PRODUCTS.filter((p) => p.promoPrice != null);

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.id !== product.id && !!p.category && p.category === product.category,
  );
  const ids = new Set(sameCategory.map((p) => p.id));
  const rest = PRODUCTS.filter((p) => p.id !== product.id && !ids.has(p.id));
  return [...sameCategory, ...rest].slice(0, limit);
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function searchProducts(products: Product[], query: string): Product[] {
  const q = normalizeText(query.trim());
  if (!q) return products;
  const terms = q.split(/\s+/);
  return products.filter((p) => {
    const haystack = normalizeText(
      [p.name, p.category, p.brand, p.description, p.sku].filter(Boolean).join(" "),
    );
    return terms.every((t) => haystack.includes(t));
  });
}
