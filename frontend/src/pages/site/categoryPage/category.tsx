import { Link, useLocation } from "react-router";
import { CategoryResponse, ProductResponse } from '../../../lib/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ProductIListItem from '../components/ProductIListItem';
import PageMeta from '../../components/PageMeta';

 type TCategoryResponse = CategoryResponse & {
  products: ProductResponse[]
 }

  //TODO: loading logic {isLoading && <Loading />}
  //TODO: Sort
  //TODO: Breadcrumbs
  //TODO: moove to context provider

function Category() {
  const activePathName:string = useLocation().pathname;
  const { data } = useQuery<TCategoryResponse[]>({
    queryKey: [activePathName.substring(2)],
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
    queryFn: async (): Promise<TCategoryResponse[]> =>  {
      const response = await axios.get('http://localhost:3000/api/categories/music');
      return response.data;
    }
  })
  if(!data) return;

  const products: ProductResponse[] = data.products;
  return (
    <>
      <PageMeta
        title={data.category_name}
        description={data.description}
      />
      
      <main className="container flex flex-col mx-auto justify-center items-center py-20 bg-light text-center px-4">
        <h1 className="fw-bolder mb-4 text-4xl">{data.category_name}</h1>
        <div className="grid grid-cols-4 justify-between gap-4" >
          {products.map((product: ProductResponse) => (
            <ProductIListItem key={product.id} product={{ ...product, category_slug: data.slug }} />
          ))}
        </div>
      </main>
    </>
  );
}

export default Category;
