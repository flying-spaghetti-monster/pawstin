import { useLocation } from "react-router";
import { CategoryResponse, ProductResponse } from '../../../lib/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ProductIListItem from '../components/ProductIListItem';
import PageMeta from '../../components/PageMeta';

type _CategoryResponse = CategoryResponse & {
  products: ProductResponse[]
}

//TODO: loading logic {isLoading && <Loading />}
//TODO: Sort
//TODO: Breadcrumbs
//TODO: moove to context provider

function Category() {
  const activePathName: string = useLocation().pathname;
  const { data: category } = useQuery<_CategoryResponse, Error, _CategoryResponse, [string]>({
    queryKey: [activePathName.substring(2)],
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previousData) => previousData,
    queryFn: async (): Promise<_CategoryResponse> => {
      const response = await axios.get('http://localhost:3000/api/categories/music');
      return response.data;
    }
  });

  if (!category) return <></>;

  const products: ProductResponse[] = category.products;
  return (
    <>
      <PageMeta
        title={category.category_name}
        description={category.description}
      />

      <main className="container flex flex-col mx-auto justify-center items-center py-20 bg-light text-center px-4">
        <h1 className="fw-bolder mb-4 text-4xl">{category.category_name}</h1>
        <div className="grid grid-cols-4 justify-between gap-4" >
          {products.map((product: ProductResponse) => (
            <ProductIListItem key={product.id} product={{ ...product, category_slug: category.slug }} />
          ))}
        </div>
      </main>
    </>
  );
}

export default Category;
