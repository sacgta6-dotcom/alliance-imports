import type { Product } from "@/types/product";
import { formatPrice, getBasePrice } from "@/utils/pricing";

interface BulkPriceDisplayProps {
  product: Product;
  quantity?: number;
}

export function BulkPriceDisplay({ product, quantity }: BulkPriceDisplayProps) {
  const tiers = product.bulkDiscountTiers;
  if (!tiers?.length) return null;

  const base = getBasePrice(product);
  const rows = [
    { label: "1 unidade", minQty: 1, maxQty: (tiers[0]?.minQty ?? 2) - 1, unitPrice: base },
    ...tiers.map((t) => ({
      label: t.label ?? (t.maxQty ? `${t.minQty} a ${t.maxQty} unidades` : `${t.minQty} ou mais`),
      minQty: t.minQty,
      maxQty: t.maxQty ?? Infinity,
      unitPrice: Math.min(t.unitPrice, base),
    })),
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <h3 className="text-sm font-semibold text-foreground">Preço por quantidade</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        O desconto é aplicado automaticamente no carrinho.
      </p>
      <ul className="mt-3 space-y-2">
        {rows.map((row) => {
          const active =
            quantity !== undefined && quantity >= row.minQty && quantity <= row.maxQty;
          return (
            <li
              key={`${row.label}-${row.minQty}`}
              className={
                "flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition-colors " +
                (active
                  ? "border-primary bg-primary/5 font-semibold text-foreground"
                  : "border-border/70 bg-background text-muted-foreground")
              }
            >
              <span>{row.label}</span>
              <span className="tabular-nums text-foreground">
                {formatPrice(row.unitPrice)} <span className="text-xs text-muted-foreground">cada</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
