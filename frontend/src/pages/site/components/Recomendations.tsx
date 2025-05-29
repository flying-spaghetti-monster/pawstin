import { ProductResponse } from '../../../lib/types';
import ProductIListItem from './ProductIListItem';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';
import axios from 'axios';

export default function Recomendations() {
  
  const { data , isLoading } = useQuery<ProductResponse[]>({
    queryKey: ['recomentations'],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
    queryFn: async (): Promise<ProductResponse[]> =>  {
      const response = await axios.get('http://localhost:3000/api/products/findAll?take=4');
      return response.data?.products ?? [];
    }
  })

  return (
    <>
      {isLoading && <Loading />}
      {(data ?? []).map((product: ProductResponse) => (
        <ProductIListItem key={product.id} product={product} />
      ))}
    </>
  );
}
