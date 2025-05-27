import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import axios from "axios";

import AddToCartBtn from "./components/AddToCartBtn";

interface Product {
  isbn: string;
  name: string;
  productName: string;
  productDescription: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

function Pdp() {
  const [product, setProduct] = useState(null);
  const [relateds, setRelateds] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const handleQuantity = (e) => {
    setQuantity((oldQty) => Number(e.target.value));
  };

  useEffect(() => {
    const controller = new AbortController();

    axios(`http://localhost:6000/product/${id}`, {
      signal: controller.signal,
      params: {
        related: true,
        count: 4,
      },
    })
      .then((data) => {
        const rels = data.data.relateds;
        delete data.data.relateds;
        const product: Product = data.data;

        setRelateds(rels);
        setProduct(product);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          // Не помилка, просто запит скасовано
          return;
        }
        console.log(err);
      });
  }, [id]);

  if (!product) {
    return <></>;
  }

  return (
    <div className="container px-4 px-lg-5 my-5">
      <div className="row">
        <div className="col">
          <section className="py-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
              <div className="col-md-6">
                <img
                  className="card-img-top mb-5 mb-md-0"
                  src={product.imageUrl}
                  alt="..."
                />
              </div>
              <div className="col-md-6">
                <div className="small mb-1">SKU: {product.isbn}</div>
                <h1 className="display-5 fw-bolder">{product.productName}</h1>
                <div className="fs-5 mb-5">
                  <span
                    className="text-decoration-line-through"
                    style={{ color: "red" }}
                  >
                    ${(product.price + product.price * 0.1).toFixed()}
                  </span>{" "}
                  <span>${product.price}</span>
                </div>
                <p className="lead">{product.productDescription}</p>
                <div className="d-flex">
                  <input
                    className="form-control text-center me-3"
                    id="inputQuantity"
                    type="num"
                    value={quantity}
                    style={{ maxWidth: "3rem" }}
                    onChange={handleQuantity}
                  />
                  <AddToCartBtn
                    className="btn btn-outline-dark flex-shrink-0"
                    product={product}
                    quantity={quantity}
                  >
                    <i className="bi-cart-fill me-1"></i>
                    Add to cart
                  </AddToCartBtn>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {relateds && (
        <div className="row">
          <div className="col">
            <section className="py-5 bg-light justify-content-center">
              <h2 className="fw-bolder mb-4 text-center">Related products</h2>
              <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {relateds.map((item) => {
                  return (
                    <div
                      key={item.isbn}
                      className="col-3  mb-5 justify-content-center py-5"
                    >
                      <div className="card h-100">
                        <Link to={`/product/${encodeURI(item.isbn)}`}>
                          <img
                            className="card-img-top"
                            src={item.imageUrl}
                            alt={item.productName}
                          />
                          <div className="card-body p-4">
                            <div className="text-center">
                              <h5 className="fw-bolder">{item.productName}</h5>$
                              {item.price}
                            </div>
                          </div>
                        </Link>

                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                          <div className="text-center">
                            <AddToCartBtn
                              className="btn btn-outline-dark mt-auto"
                              product={product}
                            >
                              Add to cart
                            </AddToCartBtn>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pdp;
