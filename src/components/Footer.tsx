import { Link } from "@tanstack/react-router";

import { STORE_CONFIG } from "@/config/store";
import { CATEGORIES } from "@/utils/catalog";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-amber-300/20 bg-[#0b0b0a] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <img src="/logo-alliance-imports.jpeg" alt={STORE_CONFIG.name} className="mb-4 h-20 w-20 rounded-full object-cover ring-2 ring-amber-300/30" />
          <p className="font-display text-xl font-bold text-white">
            {STORE_CONFIG.name}
          </p>
          <p className="mt-2 max-w-xs text-sm text-amber-50/70">{STORE_CONFIG.tagline}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Categorias</p>
          <ul className="mt-3 space-y-2 text-sm text-amber-50/70">
            {CATEGORIES.slice(0, 6).map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Atendimento</p>
          <ul className="mt-3 space-y-2 text-sm text-amber-50/70">
            <li>{STORE_CONFIG.email}</li>
            <li>{STORE_CONFIG.instagram}</li>
            <li>
              <Link to="/carrinho" className="hover:text-white">
                Meu carrinho
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-amber-50/60">
        © {new Date().getFullYear()} {STORE_CONFIG.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
