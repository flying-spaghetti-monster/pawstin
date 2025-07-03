import { useState } from "react";
import { useCartStore } from "../stores/cartStore";
import { pli, ProductResponse } from '../../../lib/types';

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

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart(product, quantity);

    // Ensure getProductFromCart returns the product or update logic accordingly
    const existingProduct = getProductFromCart(product.id);
    if (existingProduct && existingProduct.qty >= quantity) {
      setDisabled(true)
    }
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
