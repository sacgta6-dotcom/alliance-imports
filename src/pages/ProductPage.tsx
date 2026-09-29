import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ShieldCheck, ShoppingBag } from "lucide-react";
import { useState } from "react";

import { BulkPriceDisplay } from "@/components/BulkPriceDisplay";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductImage } from "@/components/ProductImage";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useCart } from "@/hooks/useCart";
import { getProductById, getRelatedProducts } from "@/utils/catalog";
import {
  formatPrice,
  getDiscountPercent,
  getLineTotal,
  getUnitPriceForQuantity,
  isOnSale,
} from "@/utils/pricing";

export function ProductPage({ id }: { id: string }) {
  const product = getProductById(id);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <CartDrawer />
        <main className="mx-auto grid max-w-3xl place-items-center px-4 py-24 text-center">
          <h1 className="font-display text-2xl font-semibold text-foreground">
            Produto não encontrado
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Este produto pode ter saído do catálogo.
          </p>
          <Link
            to="/"
            className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Voltar ao catálogo
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const gallery = product.images?.length ? product.images : product.image ? [product.image] : [];
  const soldOut = product.stock === 0;
  const unitPrice = getUnitPriceForQuantity(product, quantity);
  const lineTotal = getLineTotal(product, quantity);
  const discount = getDiscountPercent(product);
  const related = getRelatedProducts(product);

  const buyNow = () => {
    addItem(product.id, quantity, false);
    void navigate({ to: "/carrinho" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6">
        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Voltar
        </Link>

        <div className="mt-4 grid gap-8 lg:grid-cols-2">
          <div>
            <ProductImage
              src={gallery[activeImage]}
              alt={product.name}
              eager
              className="aspect-square w-full rounded-3xl border border-border/70 shadow-soft"
            />
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {gallery.map((img, index) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Imagem ${index + 1}`}
                    className={
                      "shrink-0 overflow-hidden rounded-xl border-2 transition-colors " +
                      (index === activeImage ? "border-primary" : "border-border")
                    }
                  >
                    <ProductImage src={img} alt={product.name} className="h-16 w-16" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
              {product.category && <span>{product.category}</span>}
              {product.brand && <span className="font-semibold text-foreground">{product.brand}</span>}
              {product.sku && <span>SKU {product.sku}</span>}
            </div>

            <h1 className="mt-2 font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-end gap-3">
              {isOnSale(product) && (
                <span className="text-base text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              )}
              <span className="text-3xl font-bold tracking-tight text-foreground">
                {formatPrice(unitPrice)}
              </span>
              {discount && (
                <span className="rounded-full bg-accent px-2 py-1 text-xs font-bold text-accent-foreground">
                  -{discount}%
                </span>
              )}
            </div>
            {product.unit && (
              <p className="mt-1 text-sm text-muted-foreground">Preço por {product.unit}</p>
            )}

            <p className="mt-2 text-sm font-medium">
              {soldOut ? (
                <span className="text-destructive">Produto esgotado</span>
              ) : product.stock !== undefined ? (
                <span className="text-muted-foreground">{product.stock} em estoque</span>
              ) : (
                <span className="text-muted-foreground">Disponível</span>
              )}
            </p>

            {product.description && (
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}

            <div className="mt-6">
              <BulkPriceDisplay product={product} quantity={quantity} />
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-soft">
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                <QuantitySelector
                  value={quantity}
                  onChange={setQuantity}
                  max={product.stock}
                />
                <div className="min-w-0 text-right">
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="truncate text-xl font-bold tabular-nums text-foreground">
                    {formatPrice(lineTotal)}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  disabled={soldOut}
                  onClick={() => addItem(product.id, quantity)}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-primary bg-background text-sm font-semibold text-primary transition-colors hover:bg-secondary disabled:opacity-50"
                >
                  <ShoppingBag className="h-4 w-4" /> Adicionar ao carrinho
                </button>
                <button
                  type="button"
                  disabled={soldOut}
                  onClick={buyNow}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  Comprar agora
                </button>
              </div>

              <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" /> Pedido finalizado com atendimento humano pelo
                WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-4 font-display text-xl font-semibold text-foreground sm:text-2xl">
              Você também pode gostar
            </h2>
            <ProductGrid products={related} />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
