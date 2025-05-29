import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { PageDirection, OrderResponse, Actions } from '../lib/types';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {instance as axios} from '../api/axios';

type OrdersPageContextType = {
  currentPage: number;
  ordersData: OrderResponse[];
  totalOrders: number;
  totalPages: number;
  action: Actions,
  handleChangePage: (direction: PageDirection) => void;
  createOrder: () => void;
  deleteOrder: () => void;
  editOrder: () => void;
  setAction: () => void
};

const OrdersPageContext = createContext<OrdersPageContextType | undefined>(undefined);

export const useOrdersPage = () => {
  const context = useContext(OrdersPageContext);
  if (!context) {
    throw new Error("useOrdersPage must be used within a OrdersPageProvider");
  }
  return context;
};

type ordersResponse = {
  orders: OrderResponse[],
  totalOrders: number,
  totalPages: number
}

export const OrdersPageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ action, setAction ] = useState<Actions>('CREATE');

  const { data } = useQuery<ordersResponse>({
    queryKey: ['admin-orders', currentPage, action],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
    queryFn: async () => {
      const response = await toast.promise(
        axios.get('/orders/findAll?page=' + currentPage),
        {
          loading: 'Loading orders...',
          success: 'Loaded orders successfully',
          error: 'Error loading orders',
        }
      );
      return response.data;
    }
  })

  const createOrder = async (newData: OrdersPageContextType) => {
    const response = await toast.promise(
      axios.post<OrderResponse>('/orders/create', newData),
      {
        loading: 'Loading orders...',
        success: 'Loaded orders successfully',
        error: 'Error loading orders',
      }
    );
    return response.data;
  };
  const deleteOrder = async (slug: string) => {
    const response = await toast.promise(
      axios.delete<OrderResponse>('/orders/delete' + `/${slug}`),
      {
        loading: 'Delete order...',
        success: 'Deleted order successfully',
        error: 'Error delete order',
      }
    );
    return response.data;
  };
  const editOrder = async (newData: OrderResponse) => {
    const response = await toast.promise(
      axios.patch<OrderResponse>('/orders/' + newData.slug, newData),
      {
        loading: 'Loading orders...',
        success: 'Loaded orders successfully',
        error: 'Error loading orders',
      }
    );
    return response.data;
  };

  const ordersData = data?.orders ?? [];
  const totalOrders = data?.totalOrders ?? 0;
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
      createOrder,
      deleteOrder,
      editOrder,
      currentPage,
      ordersData,
      totalOrders,
      totalPages,
      action,
      setAction
    }),
    [
      handleChangePage,
      createOrder,
      deleteOrder,
      editOrder,
      currentPage,
      ordersData,
      totalOrders,
      totalPages,
      action,
      setAction
    ]
  );

  return (
    <OrdersPageContext.Provider
      value={contextValue}
    >
      {children}
    </OrdersPageContext.Provider>
  );
};
