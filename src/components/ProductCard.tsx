import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";

import { ProductImage } from "@/components/ProductImage";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/product";
import { formatPrice, getBasePrice, getDiscountPercent, isOnSale } from "@/utils/pricing";

interface ProductCardProps {
  product: Product;
  eager?: boolean;
}

export function ProductCard({ product, eager = false }: ProductCardProps) {
  const { addItem } = useCart();
  const onSale = isOnSale(product);
  const discount = getDiscountPercent(product);
  const soldOut = product.stock === 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-blue-900/10 bg-card shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated">
      <Link
        to="/produto/$id"
        params={{ id: product.id }}
        className="relative block"
        aria-label={product.name}
      >
        <ProductImage
          src={product.image}
          alt={product.name}
          eager={eager}
          className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {onSale && (
            <span className="rounded-full bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
              Oferta{discount ? ` ${discount}%` : ""}
            </span>
          )}
          {soldOut && (
            <span className="rounded-full bg-foreground/85 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-background">
              Esgotado
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
        <div className="flex min-w-0 items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
          {product.category && <span className="truncate">{product.category}</span>}
          {product.category && product.brand && <span className="shrink-0">·</span>}
          {product.brand && <span className="truncate font-medium">{product.brand}</span>}
        </div>

        <Link
          to="/produto/$id"
          params={{ id: product.id }}
          className="line-clamp-2 text-sm font-semibold leading-snug text-foreground hover:text-blue-700 sm:text-[15px]"
        >
          {product.name}
        </Link>

        <div className="mt-auto pt-2">
          {onSale && (
            <div className="text-xs text-muted-foreground line-through">
              {formatPrice(product.price)}
            </div>
          )}
          <div className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            {formatPrice(getBasePrice(product))}
          </div>
          {product.unit && (
            <div className="text-[11px] text-muted-foreground">por {product.unit}</div>
          )}
        </div>

        <div className="mt-3 grid gap-2">
          <button
            type="button"
            disabled={soldOut}
            onClick={() => addItem(product.id, 1)}
           className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#D6A520] px-3 text-sm font-semibold text-[#17120A] transition-colors hover:bg-[#B88912] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag className="h-4 w-4" />
            {soldOut ? "Indisponível" : "Adicionar"}
          </button>
          <Link
            to="/produto/$id"
            params={{ id: product.id }}
            className="inline-flex h-9 items-center justify-center rounded-full border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Ver produto
          </Link>
        </div>
      </div>
    </article>
  );
}
