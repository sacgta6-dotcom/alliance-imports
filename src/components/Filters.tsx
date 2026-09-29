import { BRANDS, CATEGORIES, PRICE_RANGE } from "@/utils/catalog";
import { formatPrice } from "@/utils/pricing";
import { cn } from "@/lib/utils";

export interface FilterState {
  category: string;
  brand: string;
  onlyOffers: boolean;
  maxPrice: number;
}

export const DEFAULT_FILTERS: FilterState = {
  category: "Todos",
  brand: "Todos",
  onlyOffers: false,
  maxPrice: PRICE_RANGE.max,
};

interface FiltersProps {
  value: FilterState;
  onChange: (value: FilterState) => void;
  className?: string;
}

function Chips({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {["Todos", ...options].map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-sm transition-colors",
            selected === option
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-foreground hover:bg-secondary",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function Filters({ value, onChange, className }: FiltersProps) {
  const set = (patch: Partial<FilterState>) => onChange({ ...value, ...patch });

  return (
    <div className={cn("space-y-6", className)}>
      <section>
        <h3 className="mb-2 text-sm font-semibold text-foreground">Categorias</h3>
        <Chips
          options={CATEGORIES}
          selected={value.category}
          onSelect={(category) => set({ category })}
        />
      </section>

      <section>
        <h3 className="mb-2 text-sm font-semibold text-foreground">Marcas</h3>
        <Chips options={BRANDS} selected={value.brand} onSelect={(brand) => set({ brand })} />
      </section>

      <section>
        <h3 className="mb-2 text-sm font-semibold text-foreground">Preço máximo</h3>
        <input
          type="range"
          min={PRICE_RANGE.min}
          max={PRICE_RANGE.max}
          step={10}
          value={value.maxPrice}
          onChange={(e) => set({ maxPrice: Number(e.target.value) })}
          aria-label="Preço máximo"
          className="w-full accent-[var(--primary)]"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>{formatPrice(PRICE_RANGE.min)}</span>
          <span className="font-semibold text-foreground">{formatPrice(value.maxPrice)}</span>
        </div>
      </section>

      <section>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card px-3 py-3">
          <input
            type="checkbox"
            checked={value.onlyOffers}
            onChange={(e) => set({ onlyOffers: e.target.checked })}
            className="h-4 w-4 accent-[var(--accent)]"
          />
          <span className="text-sm font-medium text-foreground">Somente em promoção</span>
        </label>
      </section>

      <button
        type="button"
        onClick={() => onChange(DEFAULT_FILTERS)}
        className="w-full rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
      >
        Limpar filtros
      </button>
    </div>
  );
}
