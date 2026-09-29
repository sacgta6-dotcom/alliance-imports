import { Link } from "@tanstack/react-router";
import { ShoppingBag, Trash2 } from "lucide-react";

import { ProductImage } from "@/components/ProductImage";
import { QuantitySelector } from "@/components/QuantitySelector";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { STORE_CONFIG } from "@/config/store";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/pricing";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

export function CartDrawer() {
  const { isOpen, setOpen, lines, total, count, setQuantity, removeItem, clear } = useCart();
  const finalTotal = total + STORE_CONFIG.shippingFee;

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-4 py-4">
          <SheetTitle className="text-left text-base">
            Seu carrinho {count > 0 && <span className="text-muted-foreground">({count})</span>}
          </SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">Seu carrinho está vazio</p>
            <p className="text-sm text-muted-foreground">
              Explore o catálogo e adicione seus produtos favoritos.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Continuar comprando
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="space-y-4">
                {lines.map((line) => (
                  <li key={line.product.id} className="flex gap-3">
                    <Link
                      to="/produto/$id"
                      params={{ id: line.product.id }}
                      onClick={() => setOpen(false)}
                      className="shrink-0"
                    >
                      <ProductImage
                        src={line.product.image}
                        alt={line.product.name}
                        className="h-20 w-20 rounded-xl"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-semibold text-foreground">
                        {line.product.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {formatPrice(line.unitPrice)} cada
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <QuantitySelector
                          size="sm"
                          value={line.quantity}
                          max={line.product.stock}
                          onChange={(q) => setQuantity(line.product.id, q)}
                        />
                        <span className="text-sm font-bold tabular-nums text-foreground">
                          {formatPrice(line.subtotal)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remover ${line.product.name}`}
                      onClick={() => removeItem(line.product.id)}
                      className="h-8 w-8 shrink-0 rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
                    >
                      <Trash2 className="mx-auto h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 border-t border-border px-4 py-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{formatPrice(total)}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Frete fixo</span>
                  <span className="tabular-nums">{formatPrice(STORE_CONFIG.shippingFee)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-2 text-base font-bold text-foreground">
                  <span>Total</span>
                  <span className="tabular-nums">{formatPrice(finalTotal)}</span>
                </div>
              </div>
              <a
                href={buildWhatsAppUrl(lines, total)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center rounded-full bg-[#25D366] text-sm font-bold text-white shadow-md transition-colors hover:bg-[#1ebe5d]"
              >
                Finalizar pedido pelo WhatsApp
              </a>
              <div className="flex gap-2">
                <Link
                  to="/carrinho"
                  onClick={() => setOpen(false)}
                  className="flex h-10 flex-1 items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-foreground hover:bg-secondary"
                >
                  Ver carrinho
                </Link>
                <button
                  type="button"
                  onClick={clear}
                  className="flex h-10 items-center justify-center rounded-full border border-border px-4 text-sm font-medium text-muted-foreground hover:bg-secondary"
                >
                  Limpar
                </button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
