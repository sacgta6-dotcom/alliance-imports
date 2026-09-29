import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number | undefined;
  size?: "sm" | "md";
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const limit = typeof max === "number" && max > 0 ? max : undefined;
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(limit ? Math.min(limit, value + 1) : value + 1);

  const btn =
    size === "sm"
      ? "h-8 w-8 text-sm"
      : "h-11 w-11 text-base";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-card",
        className,
      )}
    >
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Diminuir quantidade"
        className={cn(
          "grid place-items-center rounded-full text-foreground transition-colors hover:bg-secondary disabled:opacity-40",
          btn,
        )}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span
        className={cn(
          "min-w-8 text-center font-semibold tabular-nums",
          size === "sm" ? "text-sm" : "text-base",
        )}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={limit !== undefined && value >= limit}
        aria-label="Aumentar quantidade"
        className={cn(
          "grid place-items-center rounded-full text-foreground transition-colors hover:bg-secondary disabled:opacity-40",
          btn,
        )}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
