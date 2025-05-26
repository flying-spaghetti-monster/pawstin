import { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router";

import { useCartStore } from "../stores/cartStore";
import axios from "axios";

import "./Cart.scss";

// import { FaRegTrashAlt, FaLongArrowAltLeft } from "react-icons/fa";

function getTotal(plis, data) {
  if (!plis.length || !data.length) {
    return 0;
  }
  let res = data
    .map((item) => {
      return item.price * plis.find((i) => i.isbn === item.isbn)?.qty;
    })
    .reduce((res, val) => (res += val), 0);
  console.log("res", res);
  return res;
}

function Cart() {
  const plis = useCartStore((state) => state.plis);
  const addProduct = useCartStore((state) => state.addToCart);
  const removeProduct = useCartStore((state) => state.removeFromCart);

  // const { cart, updateProduct, deleteProduct } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  console.log(total);

  const getProductQty = (id) => {
    return products.find((item) => {
      return item.isbn === id;
    });
  };

  const getQuantity = (id: string, qty: number): number => {
    if (!plis.length || !id) {
      return 0;
    }
    const productQty = getProductQty(id)?.quantity;
    const currentCartProductQty = plis.find((item) => item.id === id)?.qty;

    if (!productQty || !currentCartProductQty) {
      return;
    }

    if (!qty) {
      return currentCartProductQty;
    }

    let cartQty =
      currentCartProductQty > productQty ? productQty : currentCartProductQty;

    cartQty = cartQty >= 1 ? cartQty : 1;

    if (qty <= productQty) {
      return qty;
    }
    if (qty && qty > productQty) {
      cartQty = productQty;
    }
    return cartQty;
  };

  const changeQty = (prop) => {
    let qty = getQuantity(prop.isbn, 0);
    // console.log("134", qty);
    switch (prop.operand) {
      case "+":
        qty = getQuantity(prop.isbn, qty + 1);
        break;
      case "-":
        qty = getQuantity(prop.isbn, qty - 1);
        break;
      default:
        qty = getQuantity(prop.isbn, Number(prop.operand));
        break;
    }

    addProduct({ id: prop.isbn, qty: qty });
    setTotal(getTotal(plis, products));
  };

  const handleRemoveItem = (id) => {
    removeProduct(id);
  };

  useEffect(() => {
    const controller = new AbortController();

    axios("http://localhost:6000/cart", {
      params: {
        ids: plis.map((item) => item.id),
      },
      paramsSerializer: (params) => {
        return params.ids
          .map((id) => `ids[]=${encodeURIComponent(id)}`)
          .join("&");
      },
      signal: controller.signal,
    })
      .then((data) => {
        setProducts(data.data);
        setTotal(getTotal(plis, data.data));
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          // Не помилка, просто запит скасовано
          return;
        }
        console.log(err);
      });
  }, []);

  if (!products.length) {
    return (
      <div className="alert alert-warning" role="alert">
        A simple warning alert—check it out!
      </div>
    );
  }

  return (
    <div>
      <div className="container py-5">
        <h1 className="mb-5">Your Shopping Cart</h1>
        <div className="row">
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                {products.map((item, index) => {
                  return (
                    <div key={index} className="row cart-item mb-3">
                      <div className="col-md-3">
                        <Link to={`/product/${item.isbn}`}>
                          <img
                            src={item.imageUrl}
                            alt={item.productName}
                            className="img-fluid rounded"
                          />
                        </Link>
                      </div>
                      <div className="col-md-5">
                        <h5 className="card-title">{item.productName}</h5>
                        <p className="text-muted">{item.productMaterial}</p>
                      </div>
                      <div className="col-md-2">
                        <div className="input-group">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            type="button"
                            onClick={() => {
                              changeQty({ operand: "-", isbn: item.isbn });
                            }}
                          >
                            -
                          </button>
                          <input
                            style={{ maxWidth: "100px" }}
                            type="string"
                            className="form-control  form-control-sm text-center quantity-input"
                            value={plis.find((i) => i.id === item.isbn)?.qty}
                            onChange={(e) => {
                              changeQty({
                                operand: e.target.value,
                                isbn: item.isbn,
                              });
                            }}
                          />
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            type="button"
                            onClick={() => {
                              changeQty({ operand: "+", isbn: item.isbn });
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2 text-end">
                        <p className="fw-bold">
                          ${item.price * getQuantity(item.isbn, 0)}
                        </p>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={(e) => handleRemoveItem(item.isbn)}
                        >
                          {/* <FaRegTrashAlt size={24} color="red" /> */}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-start mb-4">
              <Link to="/products" className="btn btn-outline-primary">
                {/* <FaLongArrowAltLeft />  */}
                Continue Shopping
              </Link>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card cart-summary">
              <div className="card-body">
                <h5 className="card-title mb-4">Order Summary</h5>
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal</span>
                  <span>${total}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping</span>
                  <span>$10.00</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Tax</span>
                  <span>$20.00</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total</strong>
                  <strong>${total - 20 - 10}</strong>
                </div>
                <Link to="/checkout" className="btn btn-primary w-100">
                  Proceed to Checkout
                </Link>
              </div>
            </div>

            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title mb-3">Apply Promo Code</h5>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter promo code"
                  />
                  <button className="btn btn-outline-secondary" type="button">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
