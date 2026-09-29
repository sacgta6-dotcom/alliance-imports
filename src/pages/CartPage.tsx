import { Link } from "@tanstack/react-router";
import { ShoppingBag, Trash2 } from "lucide-react";

import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductImage } from "@/components/ProductImage";
import { QuantitySelector } from "@/components/QuantitySelector";
import { STORE_CONFIG } from "@/config/store";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/pricing";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

export function CartPage() {
  const { lines, total, count, setQuantity, removeItem, clear } = useCart();
  const finalTotal = total + STORE_CONFIG.shippingFee;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6">
        <h1 className="mt-6 font-display text-2xl font-bold text-foreground sm:text-3xl">
          Meu carrinho
        </h1>
        <p className="text-sm text-muted-foreground">
          {count} item{count === 1 ? "" : "s"}
        </p>

        {lines.length === 0 ? (
          <div className="mt-8 grid place-items-center rounded-3xl border border-dashed border-border bg-card px-6 py-20 text-center">
            <ShoppingBag className="h-9 w-9 text-muted-foreground" />
            <p className="mt-4 text-base font-semibold text-foreground">
              Seu carrinho está vazio
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Adicione produtos do catálogo para continuar.
            </p>
            <Link
              to="/"
              className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <ul className="space-y-3">
              {lines.map((line) => (
                <li
                  key={line.product.id}
                  className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-2xl border border-border/70 bg-card p-3 shadow-soft sm:p-4"
                >
                  <Link to="/produto/$id" params={{ id: line.product.id }} className="shrink-0">
                    <ProductImage
                      src={line.product.image}
                      alt={line.product.name}
                      className="h-24 w-24 rounded-xl sm:h-28 sm:w-28"
                    />
                  </Link>
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to="/produto/$id"
                        params={{ id: line.product.id }}
                        className="line-clamp-2 text-sm font-semibold text-foreground hover:text-primary sm:text-base"
                      >
                        {line.product.name}
                      </Link>
                      <button
                        type="button"
                        aria-label={`Remover ${line.product.name}`}
                        onClick={() => removeItem(line.product.id)}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatPrice(line.unitPrice)} por {line.product.unit ?? "unidade"}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <QuantitySelector
                        size="sm"
                        value={line.quantity}
                        max={line.product.stock}
                        onChange={(q) => setQuantity(line.product.id, q)}
                      />
                      <span className="text-base font-bold tabular-nums text-foreground">
                        {formatPrice(line.subtotal)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
                <h2 className="text-base font-semibold text-foreground">Resumo do pedido</h2>
                <dl className="mt-4 space-y-2 text-sm">
                  {lines.map((line) => (
                    <div key={line.product.id} className="flex justify-between gap-3">
                      <dt className="min-w-0 truncate text-muted-foreground">
                        {line.quantity}× {line.product.name}
                      </dt>
                      <dd className="shrink-0 tabular-nums text-foreground">
                        {formatPrice(line.subtotal)}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="tabular-nums">{formatPrice(total)}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Frete fixo</span>
                    <span className="tabular-nums">{formatPrice(STORE_CONFIG.shippingFee)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-3 text-lg font-bold text-foreground">
                    <span>Total</span>
                    <span className="tabular-nums">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
                <a
                  href={buildWhatsAppUrl(lines, total)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-[#25D366] text-sm font-bold text-white shadow-md transition-colors hover:bg-[#1ebe5d]"
                >
                  Finalizar pedido pelo WhatsApp
                </a>
                <button
                  type="button"
                  onClick={clear}
                  className="mt-2 h-10 w-full rounded-full border border-border text-sm font-medium text-muted-foreground hover:bg-secondary"
                >
                  Limpar carrinho
                </button>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
