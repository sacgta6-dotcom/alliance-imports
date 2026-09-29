import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getProductById } from "@/utils/catalog";
import { getLineTotal, getUnitPriceForQuantity } from "@/utils/pricing";
import type { CartItem, Product } from "@/types/product";

const STORAGE_KEY = "loja:cart:v1";

export interface CartLine {
  product: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface CartContextValue {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  total: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItem: (productId: string, quantity?: number, openDrawer?: boolean) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((entry) => {
        const e = (entry ?? {}) as Record<string, unknown>;
        const id = e["id"] != null ? String(e["id"]) : "";
        const quantity = Number(e["quantity"]);
        if (!id || !Number.isFinite(quantity) || quantity < 1) return null;
        return { id, quantity: Math.floor(quantity) } satisfies CartItem;
      })
      .filter((e): e is CartItem => e !== null);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setItems(readStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage indisponível */
    }
  }, [items, hydrated]);

  const addItem = useCallback((productId: string, quantity = 1, openDrawer = true) => {
    const qty = Math.max(1, Math.floor(quantity));
    setItems((prev) => {
      const existing = prev.find((i) => i.id === productId);
      if (existing) {
        return prev.map((i) =>
          i.id === productId ? { ...i, quantity: i.quantity + qty } : i,
        );
      }
      return [...prev, { id: productId, quantity: qty }];
    });
    if (openDrawer) setOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const qty = Math.floor(quantity);
    setItems((prev) =>
      qty < 1
        ? prev.filter((i) => i.id !== productId)
        : prev.map((i) => (i.id === productId ? { ...i, quantity: qty } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const lines = useMemo<CartLine[]>(
    () =>
      items
        .map((item) => {
          const product = getProductById(item.id);
          if (!product) return null;
          return {
            product,
            quantity: item.quantity,
            unitPrice: getUnitPriceForQuantity(product, item.quantity),
            subtotal: getLineTotal(product, item.quantity),
          } satisfies CartLine;
        })
        .filter((l): l is CartLine => l !== null),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      lines,
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      total: lines.reduce((sum, l) => sum + l.subtotal, 0),
      isOpen,
      setOpen,
      addItem,
      removeItem,
      setQuantity,
      clear,
    }),
    [items, lines, isOpen, addItem, removeItem, setQuantity, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de <CartProvider>");
  return ctx;
}
