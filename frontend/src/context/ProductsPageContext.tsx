import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { PageDirection, ProductResponse, Actions } from '../lib/types';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {instance as axios} from '../api/axios';

type ProductsPageContextType = {
  currentPage: number;
  productsData: ProductResponse[];
  totalProducts: number;
  totalPages: number;
  action: Actions,
  handleChangePage: (direction: PageDirection) => void;
  createProduct: () => void;
  deleteProduct: () => void;
  editProduct: () => void;
  setAction: () => void
};

const ProductsPageContext = createContext<ProductsPageContextType | undefined>(undefined);

export const useProductsPage = () => {
  const context = useContext(ProductsPageContext);
  if (!context) {
    throw new Error("useProductsPage must be used within a ProductsPageProvider");
  }
  return context;
};

type productsResponse = {
  products: ProductResponse[],
  totalProducts: number,
  totalPages: number
}

export const ProductsPageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ action, setAction ] = useState<Actions>('CREATE');

  const { data } = useQuery<productsResponse>({
    queryKey: ['admin-products', currentPage, action],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
    queryFn: async () => {
      const response = await toast.promise(
        axios.get('/products/findAll?page=' + currentPage),
        {
          loading: 'Loading products...',
          success: 'Loaded products successfully',
          error: 'Error loading products',
        }
      );
      return response.data;
    }
  })

  const createProduct = async (newData: ProductsPageContextType) => {
    // Function to create a new product
    console.log(newData)
    const response = await toast.promise(
      axios.post<ProductResponse>('/products/create', newData),
      {
        loading: 'Loading products...',
        success: 'Loaded products successfully',
        error: 'Error loading products',
      }
    );
    return response.data;
  };
  const deleteProduct = async (slug: string) => {
    const response = await toast.promise(
      axios.delete<ProductResponse>('/products/delete' + `/${slug}`),
      {
        loading: 'Delete product...',
        success: 'Deleted product successfully',
        error: 'Error delete product',
      }
    );
    return response.data;
  };
  const editProduct = async (newData: ProductResponse) => {
    const response = await toast.promise(
      axios.patch<ProductResponse>('/products/' + newData.slug, newData),
      {
        loading: 'Loading products...',
        success: 'Loaded products successfully',
        error: 'Error loading products',
      }
    );
    return response.data;
  };

  const productsData = data?.products ?? [];
  const totalProducts = data?.totalProducts ?? 0;
  const totalPages = data?.totalPages ?? 1;

  // event handlers / actions
  const handleChangePage = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      handleChangePage,
      createProduct,
      deleteProduct,
      editProduct,
      currentPage,
      productsData,
      totalProducts,
      totalPages,
      action,
      setAction
    }),
    [
      handleChangePage,
      createProduct,
      deleteProduct,
      editProduct,
      currentPage,
      productsData,
      totalProducts,
      totalPages,
      action,
      setAction
    ]
  );

  return (
    <ProductsPageContext.Provider
      value={contextValue}
    >
      {children}
    </ProductsPageContext.Provider>
  );
};
