import { SlidersHorizontal, Sparkles, Truck, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { CartDrawer } from "@/components/CartDrawer";
import { DEFAULT_FILTERS, Filters, type FilterState } from "@/components/Filters";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CATEGORIES, OFFERS, PRODUCTS, searchProducts } from "@/utils/catalog";

export function Home() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    let list = searchProducts(PRODUCTS, query);
    if (filters.category !== "Todos") list = list.filter((p) => p.category === filters.category);
    if (filters.brand !== "Todos") list = list.filter((p) => p.brand === filters.brand);
    if (filters.onlyOffers) list = list.filter((p) => p.promoPrice != null);
    list = list.filter((p) => (p.promoPrice ?? p.price) <= filters.maxPrice);
    return list;
  }, [query, filters]);

  const featured = useMemo(() => PRODUCTS.slice(0, 4), []);
  const offers = useMemo(() => OFFERS.slice(0, 4), []);

  const selectCategory = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
    if (typeof document !== "undefined") {
      document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header query={query} onQueryChange={setQuery} onCategorySelect={selectCategory} />
      <CartDrawer />

      <main className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6">
        {/* Banner principal - identidade Alliance Imports */}
        <section className="relative mt-4 overflow-hidden rounded-3xl border border-amber-300/30 bg-[#0b0b0a] shadow-elevated">
          <a href="#catalogo" aria-label="Ver catálogo ALLIANCE IMPORTS" className="block">
            <img
              src="/banner-alliance-imports.png"
              alt="ALLIANCE IMPORTS - importados com confiança, qualidade e entrega para todo o Brasil"
              className="block h-auto w-full object-contain"
            />
          </a>
        </section>

        {/* Selos */}
        <section className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: Truck, title: "Envio para todo o Brasil", text: "Postagem em até 24h úteis" },
            { icon: ShieldCheck, title: "Produtos originais", text: "Curadoria e conferência" },
            { icon: Sparkles, title: "Preço por quantidade", text: "Descontos automáticos" },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 rounded-2xl border border-amber-900/10 bg-card p-4 shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <item.icon className="h-5 w-5 shrink-0 text-amber-600" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{item.title}</p>
                <p className="truncate text-xs text-muted-foreground">{item.text}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Categorias */}
        {CATEGORIES.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-bold text-[#2a2418] sm:text-2xl">
              Categorias
            </h2>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
              {["Todos", ...CATEGORIES].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => selectCategory(category)}
                  className={
                    "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors " +
                    (filters.category === category
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:bg-secondary")
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Ofertas */}
        {offers.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-bold text-[#2a2418] sm:text-2xl">
              Ofertas da semana
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">Descontos por tempo limitado</p>
            <ProductGrid products={offers} loading={loading} skeletonCount={4} />
          </section>
        )}

        {/* Destaques */}
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold text-[#2a2418] sm:text-2xl">
            Destaques
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">Selecionados pela nossa curadoria</p>
          <ProductGrid products={featured} loading={loading} skeletonCount={4} />
        </section>

        {/* Catálogo */}
        <section id="catalogo" className="mt-12 scroll-mt-24">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="min-w-0">
              <h2 className="font-display text-xl font-bold text-[#2a2418] sm:text-2xl">
                Catálogo completo
              </h2>
              <p className="text-sm text-muted-foreground">
                {filtered.length} produto{filtered.length === 1 ? "" : "s"}
              </p>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground shadow-soft lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" /> Filtros
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-3xl">
                <SheetHeader className="mb-4">
                  <SheetTitle className="text-left">Filtrar produtos</SheetTitle>
                </SheetHeader>
                <Filters value={filters} onChange={setFilters} />
              </SheetContent>
            </Sheet>
          </div>

          <div className="mt-5 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
                <Filters value={filters} onChange={setFilters} />
              </div>
            </aside>
            <ProductGrid products={filtered} loading={loading} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
