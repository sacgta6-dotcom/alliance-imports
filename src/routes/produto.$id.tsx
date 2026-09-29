import { createFileRoute } from "@tanstack/react-router";

import { ProductPage } from "@/pages/ProductPage";
import { STORE_CONFIG } from "@/config/store";
import { getProductById } from "@/utils/catalog";

export const Route = createFileRoute("/produto/$id")({
  head: ({ params }) => {
    const product = getProductById(params.id);
    const title = product
      ? `${product.name} — ${STORE_CONFIG.name}`
      : `Produto não encontrado — ${STORE_CONFIG.name}`;
    const description =
      product?.description ??
      "Confira este produto importado com preço especial por quantidade.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductRoute,
});

function ProductRoute() {
  const { id } = Route.useParams();
  return <ProductPage id={id} />;
}
