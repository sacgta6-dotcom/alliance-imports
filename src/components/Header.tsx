import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag } from "lucide-react";
import { useState } from "react";

import { Search } from "@/components/Search";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { STORE_CONFIG } from "@/config/store";
import { useCart } from "@/hooks/useCart";
import { CATEGORIES } from "@/utils/catalog";

interface HeaderProps {
  query?: string;
  onQueryChange?: (value: string) => void;
  onCategorySelect?: (category: string) => void;
}

export function Header({ query, onQueryChange, onCategorySelect }: HeaderProps) {
  const { count, setOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [localQuery, setLocalQuery] = useState("");

  const searchValue = query ?? localQuery;
  const handleQuery = onQueryChange ?? setLocalQuery;

  return (
    <header className="sticky top-0 z-40 border-b border-amber-300/20 bg-[#0b0b0a]/95 text-white shadow-lg backdrop-blur-md">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 py-3 sm:gap-4">
          <div className="flex min-w-0 items-center gap-1">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Abrir menu"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] max-w-sm p-0">
                <SheetHeader className="border-b border-border px-4 py-4">
                  <SheetTitle className="text-left">{STORE_CONFIG.name}</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 p-3">
                  <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    Início
                  </Link>
                  <Link
                    to="/carrinho"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    Carrinho
                  </Link>
                  <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Categorias
                  </p>
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category}
                      to="/"
                      hash="catalogo"
                      onClick={() => {
                        onCategorySelect?.(category);
                        setMenuOpen(false);
                      }}
                      className="rounded-xl px-3 py-3 text-sm text-foreground hover:bg-secondary"
                    >
                      {category}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <Link to="/" className="flex min-w-0 items-center gap-2">
              {STORE_CONFIG.logoUrl ? (
                <img
                  src={STORE_CONFIG.logoUrl}
                  alt={STORE_CONFIG.name}
                  className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-amber-300/35 sm:h-12 sm:w-12"
                />
              ) : (
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary font-display text-base font-bold text-primary-foreground">
                  {STORE_CONFIG.name.charAt(0)}
                </span>
              )}
              <span className="hidden truncate font-display text-lg font-semibold tracking-tight text-white sm:block">
                {STORE_CONFIG.name}
              </span>
            </Link>
          </div>

          <div className="min-w-0">
            <Search value={searchValue} onChange={handleQuery} />
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir carrinho"
            className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-white/20"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
