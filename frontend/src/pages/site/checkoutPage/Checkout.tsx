import { useState} from "react";
import { Link } from "react-router";
import { useCartStore } from "../stores/cartStore";

function Cart() {
  const items = useCartStore((state) => state.items);
  const totalQuantity = useCartStore((state) => state.totalQuantity);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isPlced, setPlaced] = useState(false);

  const handlePlaceOrder = () => {
    clearCart();
    setPlaced(true);
  };

  if (isPlced) {
    return (
      <div className="container mx-auto p-4">
        <section>
          <div className="row">
            <div role="alert" aria-live="assertive" aria-atomic="true">
              <div className="toast-body">
                Order was Plased.
                <div className="mt-2 pt-2 border-top">
                  <button
                    onClick={() => {
                      // redirect("/");
                    }}
                    type="button"
                    className="btn btn-primary btn-sm"
                  >
                    Go Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <section className='flex'>
        <div className="flex-1 bg-blue-100">
          <div className="card mb-4">
            <div className="card-header py-3">
              <h5 className="mb-0 text-font text-uppercase">
                Delivery address
              </h5>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-4">
                  <div className="col">
                    <div data-mdb-input-init className="form-outline">
                      <input
                        type="text"
                        id="form11Example1"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="form11Example1">
                        First name
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <div data-mdb-input-init className="form-outline">
                      <input
                        type="text"
                        id="form11Example2"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="form11Example2">
                        Last name
                      </label>
                    </div>
                  </div>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="text"
                    id="form11Example4"
                    className="form-control"
                  />
                  <label className="form-label" htmlFor="form11Example4">
                    Address
                  </label>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="email"
                    id="form11Example5"
                    className="form-control"
                  />
                  <label className="form-label" htmlFor="form11Example5">
                    Email
                  </label>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="number"
                    id="form11Example6"
                    className="form-control"
                  />
                  <label className="form-label" htmlFor="form11Example6">
                    Phone
                  </label>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <textarea
                    className="form-control"
                    id="form11Example7"
                    rows={4}
                    defaultValue={""}
                  ></textarea>
                  <label className="form-label" htmlFor="form11Example7">
                    Additional information
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className="card payment mb-4">
            <div className="card-header py-3">
              <h5 className="mb-0 text-font text-uppercase">Payment</h5>
            </div>
            <div className="payment-body">
              <div className="row my-3">
                <div className="col">
                  <div className="form-check">
                    <input
                      id="credit"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                      checked={true}
                    />
                    <label className="form-check-label" htmlFor="credit">
                      Credit card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="paypal"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      PayPal
                    </label>
                  </div>
                </div>
              </div>
              <div className="row gy-3">
                <div className="col-md-6 ">
                  <label htmlFor="cc-name" className="form-label">
                    Name on card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-name"
                    placeholder=""
                    required
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div className="invalid-feedback">
                    Name on card is required
                  </div>
                </div>
              </div>
              <div className="row gy-3">
                <div className="col-md-6">
                  <label htmlFor="cc-number" className="form-label">
                    Credit card number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-number"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>
              </div>
              <div className="row gy-3">
                <div className="col-md-3">
                  <label htmlFor="cc-expiration" className="form-label">
                    Expiration
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>

                <div className="col-md-3 ">
                  <label htmlFor="cc-cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-cvv"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Security code required
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn button-order col-md-10"
              onClick={handlePlaceOrder}
            >
              Place order
            </button>
          </div>
        </div>
        <div className="w-[300px] bg-gray-100">
          <div className="card mb-4">
            <div className="card-header py-3">
              <h5 className="mb-0 text-font">
                1 item{" "}
                <Link
                  to="/cart"
                  className="float-end mt-1"
                  style={{ fontSize: "13px" }}
                >
                  Edit
                </Link>
              </h5>
            </div>
            <div className="card-body">
              {items.map((product, index) => {
                return (
                  <div key={index} className="row">
                    <div className="col-md-4">
                      <img
                        src="/cube.jpg"
                        alt={product.product_name}
                        className="w-[100px]"
                      />
                    </div>
                    <div className="col-md-6 ms-3">
                      <span className="mb-0 text-price">${product.price}</span>
                      <p className="mb-0 text-descriptions">
                        {product.product_name}
                      </p>
                      <p className="text-descriptions mt-0">
                        Qty:
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="card-footer mt-4">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 text-muted">
                    Subtotal
                    <span>${totalPrice}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0 fw-bold text-uppercase">
                    Total to pay
                    <span>${totalPrice - 20 - 10}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card mb-4 accordion" id="accordionExample">
            <div className="card body accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <div
                  data-mdb-collapse-init
                  className="accordion-button collapsed text-uppercase text-font h4"
                  data-mdb-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  Promo/Student Code or Vouchers
                </div>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-mdb-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div data-mdb-input-init className="form-outline d-flex">
                    <input type="text" id="form1" className="form-control" />
                    <label className="form-label" htmlFor="form1">
                      Enter code
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Cart;
