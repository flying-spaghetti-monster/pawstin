import { createContext, useEffect, useMemo, useState } from "react";
import cartStorage from "../helper/cartHelper";
import { pli, prevCart } from '../lib/types';

type CartPageContextType = {
  cart: prevCart;
  cartquantity: number;
  addProduct: (id: number, quantity: number) => void;
  updateProduct: (id: number, quantity: number) => void;
  deleteProduct: (id: number) => void;
  clearCart: () => void;
};


export const CartContext = createContext<CartPageContextType | undefined>(undefined);

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<prevCart>({
    plis: [],
    quantity: 0,
  });

  const addProduct = (id: number, quantity: number) => {
    setCart((prevCart: prevCart) => {
      const existingProduct = prevCart.plis.find((item: pli) => item.id === id);

      if (existingProduct) {
        return {
          plis: prevCart.plis.map((item: pli) =>
            item.id === id ? { ...item, quantity: item.quantity + quantity } : item
          ),
          quantity: prevCart.quantity + quantity,
        };
      } else {
        return {
          plis: [...prevCart.plis, { id: id, quantity }],
          quantity: prevCart.quantity + quantity,
        };
      }
    });
  };
  const updateProduct = (id: number, quantity: number) => {
    setCart((prevCart: prevCart) => {
      const existingProduct: pli | undefined = prevCart.plis.find((item: pli) => item.id === id);
      if (existingProduct) {
        return {
          plis: prevCart.plis.map((item: pli) =>
            item.id === id ? { ...item, quantity } : item
          ),
          quantity: prevCart.quantity - existingProduct.quantity + quantity,
        };
      }
      return prevCart;
    });
  };

  const deleteProduct = (id: number) => {
    setCart((prevCart: prevCart) => {
      const existingProduct = prevCart.plis.find((item: pli) => item.id === id);
      if (existingProduct) {
        return {
          plis: prevCart.plis.filter((item: pli) => item.id !== id),
          quantity: prevCart.quantity - existingProduct.quantity,
        };
      }
      return prevCart;
    });
  };

  const clearCart = () => {
    setCart({
      plis: [],
      quantity: 0,
    });
  };
  const cartquantity =
    (cart.plis.length &&
      Object.values(cart.plis).reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0
      )) ||
    0;

  useEffect(() => {
    const initialCart = cartStorage.getCart();
    setCart(initialCart);
  }, []);

  useEffect(() => {
    cartStorage.saveCart(cart);
  }, [cart]);


  const contextValue = useMemo(
    () => ({
      cart,
      addProduct,
      updateProduct,
      deleteProduct,
      clearCart,
      cartquantity,
    }),
    [
      cart,
      addProduct,
      updateProduct,
      deleteProduct,
      clearCart,
      cartquantity,
    ]
  );


  return (
    <CartContext.Provider
      value={contextValue}
    >
      {children}
    </CartContext.Provider>
  );
};
