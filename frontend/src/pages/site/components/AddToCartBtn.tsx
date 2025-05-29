import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { useCartStore } from "../stores/cartStore";
import { ProductResponse } from '../../../lib/types';


function AddToCartBtn({
  product,
  className,
  children,
  quantity = 1,
}: {
  product: ProductResponse,
  quantity?: number,
  className?: string,
  children: React.ReactNode,
})  {
  //TODO: implemet cartStore
  // const { plis, addProduct } = useCartStore((state) => {
  //   return {
  //     plis: state.plis,
  //     addProduct: state.addToCart,
  //   };
  // }, shallow);

  // const [isDisabled, setDisabled] = useState(false);

  // const handleAdd = (e) => {
  //   e.preventDefault();

  //   const existingCartProduct = plis.find((item) => item.id === product.isbn);

  //   if (existingCartProduct) {
  //     if (existingCartProduct.qty + quantity > product.quantity) {
  //       setDisabled(true);
  //       return;
  //     }
  //   }

  //   addProduct({ id: product.isbn, qty: quantity });
  // };

  // useEffect(() => {
  //   const existingCartProduct = plis.find((item) => item.id === product.isbn);

  //   if (existingCartProduct) {
  //     if (existingCartProduct.qty + quantity > product.quantity) {
  //       setDisabled(true);
  //     } else {
  //       setDisabled(false);
  //     }
  //   }
  // }, [plis]);

  return (
    <button
      // disabled={isDisabled}
      // className={className}
      // onClick={handleAdd}
      type="button"
      // style={isDisabled ? { backgroundColor: "gray" } : {}}
    >
      {children}
    </button>
  );
}

export default AddToCartBtn;
