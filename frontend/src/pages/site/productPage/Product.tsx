import { useLocation } from "react-router";
import { ProductResponse } from '../../../lib/types';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import AddToCartBtn from '../components/AddToCartBtn';
import Recomendations from '../components/Recomendations';

type _ProductResponse = ProductResponse & {
  category_name: string,
  slug: string
}

//implement quantity logic
//TODO: implement loading
//TODO: implement breads..
//TODO: implement slick slider
//TODO: search by category and exclude page active product
function Product() {
  const activePathName:string  = useLocation().pathname.split('/').at(-1) || '';

  const { data: product } = useQuery<_ProductResponse>({
    queryKey: [activePathName.substring(2)],
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    queryFn: async (): Promise<_ProductResponse> =>  {
      const response = await axios.get(`http://localhost:3000/api/products/${activePathName}`);
      return response.data;
    }
  })

  if(!product) return <></>;

  return (
    <main className="container grid mx-auto justify-center">
      <div className="grid grid-cols-12 gap-4 md:gap-6 px-4 py-8">
        <div className='col-span-12 xl:col-span-5'>
          <img
              className="w-[600px]"
              src="/cube.jpg"
              alt={product.product_name}
            />
        </div>
        <div className='col-span-12 xl:col-span-7'>
          <h1 className='text-3xl font-bold'>{product.product_name}</h1>
          <div>
            {product.description}
          </div>
          {/* <input type="number" value="1" className=""/> */}
          <div className="">
            $ {product.price}
          </div>
          <div className="">
            <AddToCartBtn className="" product={product}>
              Add to cart
            </AddToCartBtn>
          </div>
        </div>
      </div>
      <div>
        <Recomendations category={product.category.slug} />
      </div>
    </main>
  );
}

export default Product;
