import { ProductResponse } from '../../../lib/types';
import ProductIListItem from './ProductIListItem';
import { useQuery } from '@tanstack/react-query';
import Loading from './loading';
import axios from 'axios';

export default function Recomendations() {
  
  const { data, isLoading } = useQuery<ProductResponse[]>({
    queryKey: ['recomentations'],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
    queryFn: async () =>  {
      const response = await axios.get<ProductResponse[]>('http://localhost:3000/api/findAll?count=4');
      return response.data;
    }
  })

  console.log("Recomendations")
  console.log(data)

  return (
    <>
      {isLoading && <Loading />}
      {data && data.map((product : ProductResponse) => (
        <ProductIListItem key={product.id} product={product} />
      ))}
    </>
  );
}
