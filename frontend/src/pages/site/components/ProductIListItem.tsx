import { ProductResponse } from '../../../lib/types';
import AddToCartBtn from './AddToCartBtn';
import { Link } from 'react-router';

export default function ProductIListItem({ product } : { product : ProductResponse }) {
  return (
    <div
      key={product.id}
      className="col-3 justify-content-center py-5"
    >
      <div className="card h-100">
        <Link to={`/product/${encodeURI(product.slug)}`}>
          <img
            className="card-img-top"
            src="/cube.jpg"
            alt={product.product_name}
          />
          <div className="card-body p-4">
            <div className="text-center">
              <h5 className="fw-bolder">{product.product_name}</h5>
              $ {product.price}
            </div>
          </div>
        </Link>
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            {/* <AddToCartBtn className="btn btn-outline-dark mt-auto" product={product}>
              Add to cart
            </AddToCartBtn> */}
          </div>
        </div>
      </div>
    </div>
  );
}
