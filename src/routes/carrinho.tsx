import { createFileRoute } from "@tanstack/react-router";

import { CartPage } from "@/pages/CartPage";
import { STORE_CONFIG } from "@/config/store";

const title = `Carrinho — ${STORE_CONFIG.name}`;
const description =
  "Revise os itens do seu pedido, ajuste quantidades e finalize a compra pelo WhatsApp.";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});
