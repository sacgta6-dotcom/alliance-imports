export interface BulkDiscountTier {
  minQty: number;
  maxQty?: number | null | undefined;
  unitPrice: number;
  label?: string | undefined;
}

export interface Product {
  id: string;
  name: string;
  description?: string | undefined;
  category?: string | undefined;
  brand?: string | undefined;
  unit?: string | undefined;
  price: number;
  promoPrice?: number | null | undefined;
  image?: string | undefined;
  images?: string[] | undefined;
  stock?: number | undefined;
  sku?: string | undefined;
  bulkDiscountTiers?: BulkDiscountTier[] | undefined;
}

export interface CartItem {
  id: string;
  quantity: number;
}
