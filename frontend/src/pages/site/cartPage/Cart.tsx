import { Link } from "react-router";
import { useCartStore } from "../stores/cartStore";

//TODO: implement promo logic
function Cart() {
  const items = useCartStore((state) => state.items);
  const totalQuantity = useCartStore((state) => state.totalQuantity);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const removeProduct = useCartStore((state) => state.removeFromCart);

  const handleRemoveItem = (id) => {
    removeProduct(id);
  };

  return (
      <div className="container mx-auto p-4">
        <h1 className="mb-5">Your Shopping Cart</h1>

        {!items.length && (
        <div className="alert alert-warning" role="alert">
          A simple warning alert—check it out!
        </div>
        )}

        {items.length && (
        <div className="flex">
          <div className="flex-1 bg-blue-100">
            <div className="">
              {items.map((product, index) => {
                return (
                  <div key={index} className="">
                    <div className="">
                      <Link to={`/product/${product.slug}`}>
                        <img
                          src="/cube.jpg"
                          alt={product.product_name}
                          className="w-[300px]"
                        />
                      </Link>
                    </div>
                    <div className="">
                      <h5 className="">{product.product_name}</h5>
                    </div>
                    <div className="">
                      {product.price}
                    </div>
                    <button
                      className=""
                      onClick={(e) => handleRemoveItem(product.id)}
                    >
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="">
            <Link to="/" className="">
              Continue Shopping
            </Link>
          </div>
          </div>
          <div className="w-[300px] bg-gray-100">
            <div className="">
                <h5 className="">Order Summary</h5>
                <div className="">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="">
                  <span>Shipping</span>
                  <span>$10.00</span>
                </div>
                <div className="">
                  <span>Tax</span>
                  <span>$20.00</span>
                </div>
                <hr />
                <div className="">
                  <strong>Total</strong>
                  <strong>${totalPrice - 20 - 10}</strong>
                </div>
                <Link to="/checkout" className="">
                  Proceed to Checkout
                </Link>
            </div>
          </div>
        </div>
        )}
      </div>
  );
}

export default Cart;
