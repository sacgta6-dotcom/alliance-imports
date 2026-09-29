import { STORE_CONFIG } from "@/config/store";
import type { CartLine } from "@/hooks/useCart";
import { formatPrice } from "@/utils/pricing";

export function buildWhatsAppMessage(lines: CartLine[], subtotal: number): string {
  const header = `*Novo pedido — ${STORE_CONFIG.name}*\n`;
  const body = lines
    .map((line, index) => {
      const { product, quantity, unitPrice, subtotal } = line;
      return [
        `${index + 1}. *${product.name}*`,
        product.sku ? `   SKU: ${product.sku}` : null,
        `   Quantidade: ${quantity}${product.unit ? ` ${product.unit}(s)` : ""}`,
        `   Preço unitário: ${formatPrice(unitPrice)}`,
        `   Subtotal: ${formatPrice(subtotal)}`,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  const shipping = STORE_CONFIG.shippingFee;
  const total = subtotal + shipping;

  return `${header}\n${body}\n\n*Subtotal: ${formatPrice(subtotal)}*\n*Frete fixo: ${formatPrice(shipping)}*\n*Total com frete: ${formatPrice(total)}*`;
}

export function buildWhatsAppUrl(lines: CartLine[], subtotal: number): string {
  const text = encodeURIComponent(buildWhatsAppMessage(lines, subtotal));
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${text}`;
}
