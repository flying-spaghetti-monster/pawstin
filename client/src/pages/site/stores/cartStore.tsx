import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { pli, ProductResponse } from '../../../lib/types';


export interface TCartStorage {
  items: ProductResponse[];
  totalQuantity: number;
  totalPrice: number;
  addToCart: (product: ProductResponse, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  getProductFromCart: (id: number) => pli | undefined;
  clearCart: () => void;
}

export interface ProductItems extends ProductResponse {
  quantity?: number;
}

function calculateCart(items: ProductItems[]): { totalQuantity: number, totalPrice: number } {
  const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.quantity || 0) * item.price, 0);
  return { totalQuantity, totalPrice };
}

//TODO implement validation logic
//update busket product
//chack quantity in busket and product stock
//promo ?
export const useCartStore = create<TCartStorage>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
        addToCart: (product, quantity = 1) => {
          const existing = get().items.find(item => item.id === product.id);

          let updatedItems;
          if (existing) {
            updatedItems = get().items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.in_stock + quantity }
                : item
            );
          } else {
            updatedItems = [...get().items, { ...product, quantity }];
          }

          const totals = calculateCart(updatedItems);
          set({ items: updatedItems, ...totals });
        },
        removeFromCart: (id) => {
          const updatedItems = get().items.filter(item => item.id !== id);
          const totals = calculateCart(updatedItems);
          set({ items: updatedItems, ...totals });
        },
        getProductFromCart: (id): pli | undefined => {
          const product = get().items.find(item => item.id === id);
          return product;
        },
        clearCart: () => {
          set({ items: [], totalQuantity: 0, totalPrice: 0 });
        },
      }),
      { name: "cart-storage" }
    )
  )
);