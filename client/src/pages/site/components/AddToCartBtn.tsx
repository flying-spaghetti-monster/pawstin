import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { useCartStore } from "../stores/cartStore";
import { ProductResponse } from '../../../lib/types';

//TODO: implemet quantity logic
//TODO: implemet disable button
function AddToCartBtn({
  product,
  className,
  children,
  quantity = 1,
}: {
  product: ProductResponse,
  className: string,
  children: React.ReactNode,
  quantity?: number,
}) {
  const [isDisabled, setDisabled] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);
  const getProductFromCart = useCartStore(state => state.getProductFromCart);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product, quantity);
  };

  return (
    <button
      disabled={isDisabled}
      className={className}
      onClick={handleAdd}
      type="button"
      style={isDisabled ? { backgroundColor: "gray" } : {}}
    >
      {children}
    </button>
  );
}

export default AddToCartBtn;
