import { createContext, useEffect, useState } from "react";
import cartStorage from "../helper/cartHelper";

export const CartContext = createContext(null);

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState({
    plis: [],
    qty: 0,
  });

  const addProduct = (id, qty) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.plis.find((item) => item.isbn === id);

      if (existingProduct) {
        return {
          plis: prevCart.plis.map((item) =>
            item.isbn === id ? { ...item, qty: item.qty + qty } : item
          ),
          qty: prevCart.qty + qty,
        };
      } else {
        return {
          plis: [...prevCart.plis, { isbn: id, qty }],
          qty: prevCart.qty + qty,
        };
      }
    });
  };
  const updateProduct = (id, qty) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.plis.find((item) => item.isbn === id);
      if (existingProduct) {
        return {
          plis: prevCart.plis.map((item) =>
            item.isbn === id ? { ...item, qty } : item
          ),
          qty: prevCart.qty - existingProduct.qty + qty,
        };
      }
      return prevCart;
    });
  };

  const deleteProduct = (id) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.plis.find((item) => item.isbn === id);
      if (existingProduct) {
        return {
          plis: prevCart.plis.filter((item) => item.isbn !== id),
          qty: prevCart.qty - existingProduct.qty,
        };
      }
      return prevCart;
    });
  };

  const clearCart = () => {
    setCart({
      plis: [],
      qty: 0,
    });
  };
  const cartQty =
    (cart.plis.length &&
      Object.values(cart.plis).reduce(
        (accumulator, currentValue) => accumulator + currentValue.qty,
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

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        updateProduct,
        deleteProduct,
        clearCart,
        cartQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
