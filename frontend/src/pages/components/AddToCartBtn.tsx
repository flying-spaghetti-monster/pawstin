import { useEffect, useState } from "react";
// import { useCartContext } from "../../hooks/useCartContext";
import { useCartStore } from "../../stores/cartStore";
import {shallow} from "zustand/shallow";

// const handleAdd: () => void = (e) => {
//   e.preventDefault();
// };

function AddToCartBtn({
  product,
  quantity = 1,
  ...rest
}: {
  product: { isbn: string; quantity: number };
  quantity?: number;
  [key: string]: any;
})  {
  const { plis, addProduct } = useCartStore((state) => {
    return {
      plis: state.plis,
      addProduct: state.addToCart,
    };
  }, shallow);

  const [isDisabled, setDisabled] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();

    const existingCartProduct = plis.find((item) => item.id === product.isbn);

    if (existingCartProduct) {
      if (existingCartProduct.qty + quantity > product.quantity) {
        setDisabled(true);
        return;
      }
    }

    console.log(product.isbn, quantity);
    addProduct({ id: product.isbn, qty: quantity });
  };

  useEffect(() => {
    const existingCartProduct = plis.find((item) => item.id === product.isbn);

    if (existingCartProduct) {
      if (existingCartProduct.qty + quantity > product.quantity) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [plis]);

  return (
    <button
      disabled={isDisabled}
      className={rest.className}
      onClick={handleAdd}
      type="button"
      style={isDisabled ? { backgroundColor: "gray" } : {}}
    >
      {rest.children}
    </button>
  );
}

export default AddToCartBtn;
