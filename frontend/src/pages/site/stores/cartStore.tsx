import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

//TODO: implemet zustand cartStore
export const useCartStore = create(
  devtools(
    persist<CartStore>(
      (set) => ({
        plis: [],
        qty: 0,
        addToCart: (item: CartItem) => {
          set((state) => {
            const existingItem = state.plis.find((i) => i.id === item.id);
            if (existingItem) {
              return {
                plis: state.plis.map((i) =>
                  i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
                ),
                qty: state.qty + item.qty,
              };
            } else {
              return {
                plis: [...state.plis, item],
                qty: state.qty + item.qty,
              };
            }
          });
        },
        removeFromCart: (id: string) => {
          set((state) => {
            const itemToRemove = state.plis.find((item) => item.id === id);
            if (itemToRemove) {
              return {
                plis: state.plis.filter((item) => item.id !== id),
                qty: state.qty - itemToRemove.qty,
              };
            }
            return state;
          });
        },
        clearCart: () => {
          set(() => ({
            plis: [],
            qty: 0,
          }));
        },
      }),
      {
        name: "cart-storage", // unique name for storage key
      }
    )
  )
);
