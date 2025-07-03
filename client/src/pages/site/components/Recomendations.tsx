import { ProductResponse } from '../../../lib/types';
import ProductIListItem from './ProductIListItem';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';
import axios from 'axios';

export default function Recomendations({ category }: { category?: string }) {
  const url: string = 'http://localhost:3000/api/products/findAll?take=4' + (category ? `&` + category : '')
  const queryKey = 'recomentations' + category ? '-' + category : '';

  const { data, isLoading } = useQuery<ProductResponse[], Error, ProductResponse[], [string]>({
    queryKey: [queryKey],
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previousData) => previousData,
    queryFn: async (): Promise<ProductResponse[]> => {
      const response = await axios.get(url);
      return response.data?.products ?? [];
    }
  })

  return (
    <section className="container flex flex-col mx-auto justify-center items-center py-5 md:py-10 2xl:py-15 bg-light text-center px-4">
      <h1 className="fw-bolder mb-8 text-xl md:text-2xl xl:text-4xl">Recommended products</h1>
      <div className="grid md:grid-cols-2 md:gap-2 xl:grid-cols-4 xl:gap-16" >
        {isLoading && <Loading />}
        {data && data.map((product: ProductResponse) => (
          <ProductIListItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
