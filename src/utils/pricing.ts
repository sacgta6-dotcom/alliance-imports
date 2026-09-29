import { STORE_CONFIG } from "@/config/store";
import type { Product } from "@/types/product";

const formatter = new Intl.NumberFormat(STORE_CONFIG.locale, {
  style: "currency",
  currency: STORE_CONFIG.currency,
});

export function formatPrice(value: number): string {
  return formatter.format(Number.isFinite(value) ? value : 0);
}

/** Preço unitário base (promoção quando existir). */
export function getBasePrice(product: Product): number {
  return product.promoPrice ?? product.price;
}

/** Preço unitário considerando faixas de quantidade (bulkDiscountTiers). */
export function getUnitPriceForQuantity(product: Product, quantity: number): number {
  const base = getBasePrice(product);
  const tiers = product.bulkDiscountTiers;
  if (!tiers?.length || quantity < 1) return base;

  const match = tiers
    .filter(
      (t) => quantity >= t.minQty && (t.maxQty == null || quantity <= t.maxQty),
    )
    .sort((a, b) => a.unitPrice - b.unitPrice)[0];

  return match ? Math.min(match.unitPrice, base) : base;
}

export function getLineTotal(product: Product, quantity: number): number {
  return getUnitPriceForQuantity(product, quantity) * quantity;
}

export function getDiscountPercent(product: Product): number | null {
  if (product.promoPrice == null || product.price <= 0) return null;
  return Math.round((1 - product.promoPrice / product.price) * 100);
}

export function isOnSale(product: Product): boolean {
  return product.promoPrice != null && product.promoPrice < product.price;
}
