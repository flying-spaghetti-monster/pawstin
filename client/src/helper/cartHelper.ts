import { prevCart } from '../lib/types';

const cartKey = "cart";

const getCart = () => {
  const cart = localStorage.getItem(cartKey);
  return cart ? JSON.parse(cart) : {};
};

const saveCart = (cart: prevCart) => {
  localStorage.setItem(cartKey, JSON.stringify(cart));
};

const cartStorage = { getCart, saveCart };

export default cartStorage;
