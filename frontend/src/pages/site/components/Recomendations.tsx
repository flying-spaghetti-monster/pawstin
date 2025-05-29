import { ProductResponse } from '../../../lib/types';
import ProductIListItem from './ProductIListItem';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';
import axios from 'axios';

export default function Recomendations({ category }: {category : string}) {
  const url:string = 'http://localhost:3000/api/products/findAll?take=4' + (category ? `&`+ category : '')
  const queryKey = 'recomentations' + category ? '-'+ category : '';
console.log(queryKey);
  const { data , isLoading } = useQuery<ProductResponse[]>({
    queryKey: [queryKey],
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
    queryFn: async (): Promise<ProductResponse[]> =>  {
      const response = await axios.get(url);
      return response.data?.products ?? [];
    }
  })

  return (
    <section className="container flex flex-col mx-auto justify-center items-center py-20 bg-light text-center px-4">
      <h1 className="fw-bolder mb-4 text-4xl">Recommended products</h1>
      <div className="flex flex-row justify-between gap-4" >
        {isLoading && <Loading />}
        {(data ?? []).map((product: ProductResponse) => (
          <ProductIListItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
