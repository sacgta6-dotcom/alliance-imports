import { PackageOpen } from "lucide-react";

import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
  skeletonCount?: number;
}

export function ProductGrid({
  products,
  loading = false,
  emptyMessage = "Nenhum produto encontrado.",
  skeletonCount = 8,
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 min-[380px]:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border/70 bg-card p-3">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="mt-3 h-3 w-1/2" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-2 h-5 w-1/3" />
            <Skeleton className="mt-3 h-10 w-full rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <PackageOpen className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
        <p className="mt-3 text-sm font-medium text-foreground">{emptyMessage}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Tente ajustar a busca ou os filtros.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} eager={index < 4} />
      ))}
    </div>
  );
}
