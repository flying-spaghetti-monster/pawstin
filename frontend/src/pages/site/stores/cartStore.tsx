import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { TCartStorage } from '../../../lib/types';



function calculateCart(items: TCartStorage[]) {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
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
        getProductFromCart: (id) => {
         return get().items.find(item => item.id === id);
        },
        clearCart: () => {
          set({ items: [], totalQuantity: 0, totalPrice: 0 });
        },
      }),
      { name: "cart-storage" }
    )
  )
);