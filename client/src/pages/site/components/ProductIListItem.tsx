import { ProductResponse } from '../../../lib/types';
import AddToCartBtn from './AddToCartBtn';
import { Link } from 'react-router';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function ProductIListItem({ product }: { product: ProductResponse }) {
  return (
    <div
      key={product.id}
      className="flex flex-col justify-center items-center border-1 border-[#d4d4d4] rounded-xl min-h-80 text-2xl mx-auto "
    >
      <Link to={`/${product.category_slug}/${encodeURI(product.slug)}`}>
        <img
          className="w-[450px] rounded-t-xl"
          src="/cube.jpg"
          alt={product.product_name}
        />
        <div className="py-4">
          <h5 className="fw-bolder font-bold">{product.product_name}</h5>
        </div>
      </Link>
      <div className="">
        {product.discont_price ? (<span className="line-through text-[#6c757d]">${product.discont_price.toFixed(2)}</span>) : ''} $ {product.price.toFixed(2)}
      </div>
      <AddToCartBtn className='flex items-center my-8 border-1 border-[#2a2e32] rounded-xl text-2xl hover:bg-[#2a2e32] hover:text-white p-4' product={product}>
        <AddShoppingCartIcon />
        Add to cart
      </AddToCartBtn>
    </div>
  );
}
