import { ProductResponse } from '../../../lib/types';
import AddToCartBtn from './AddToCartBtn';
import { Link } from 'react-router';

export default function ProductIListItem({ product }: { product: ProductResponse }) {
  return (
    <div
      key={product.id}
      className="py-5 min-h-80"
    >
      <Link to={`/${product.category_slug}/${encodeURI(product.slug)}`}>
        <img
          className="w-[450px]"
          src="/cube.jpg"
          alt={product.product_name}
        />
        <div className="">
          <h5 className="fw-bolder">{product.product_name}</h5>
          $ {product.price}
        </div>
      </Link>
      <div className="">
        <AddToCartBtn className="" product={product}>
          Add to cart
        </AddToCartBtn>
      </div>
    </div>
  );
}
