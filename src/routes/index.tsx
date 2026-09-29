import { createFileRoute } from "@tanstack/react-router";

import { Home } from "@/pages/Home";
import { STORE_CONFIG } from "@/config/store";

const title = `${STORE_CONFIG.name} — Importados premium com entrega para todo o Brasil`;
const description =
  "Loja de importados selecionados: perfumaria, eletrônicos, relógios e acessórios com descontos por quantidade e pedido pelo WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});
