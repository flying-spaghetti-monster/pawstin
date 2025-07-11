import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { PageDirection, ShipperResponse, Actions } from '../lib/types';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { instance as axios } from '../api/axios';

type ShippersPageContextType = {
  currentPage: number;
  shippersData: ShipperResponse[];
  totalShippers: number;
  totalPages: number;
  action: Actions,
  handleChangePage: (direction: PageDirection) => void;
  createShipper: (data: object) => Promise<ShipperResponse>;
  deleteShipper: (id: number) => Promise<ShipperResponse>;
  editShipper: (data: ShipperResponse) => Promise<ShipperResponse>;
  setAction: React.Dispatch<React.SetStateAction<Actions>>;
};

const ShippersPageContext = createContext<ShippersPageContextType | undefined>(undefined);

export const useShippersPage = () => {
  const context = useContext(ShippersPageContext);
  if (!context) {
    throw new Error("useShippersPage must be used within a ShippersPageProvider");
  }
  return context;
};

type shippersResponse = {
  shippers: ShipperResponse[],
  totalShippers: number,
  totalPages: number
}

export const ShippersPageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [action, setAction] = useState<Actions>(Actions.CREATE);

  const { data } = useQuery<shippersResponse, Error, shippersResponse, [string, number, Actions]>({
    queryKey: ['admin-shippers', currentPage, action],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const response = await toast.promise(
        axios.get('/shippers/findAll?page=' + currentPage),
        {
          loading: 'Loading shippers...',
          success: 'Loaded shippers successfully',
          error: 'Error loading shippers',
        }
      );
      return response.data;
    }
  })

  const createShipper = async (data: ShippersPageContextType) => {
    return toast.promise(
      axios.post<ShipperResponse>('/shippers/create', data),
      {
        loading: 'Creating shipper...',
        success: 'Shipper created successfully',
        error: (err) => {
          console.log(err);
          return 'Error creating shipper';
        },
      }
    );
  };
  const deleteShipper = async (id: number) => {
    const response = await toast.promise(
      axios.delete<ShipperResponse>('/shippers/delete' + `/${id}`),
      {
        loading: 'Delete Shipper...',
        success: 'Deleted Shipper successfully',
        error: 'Error delete Shipper',
      }
    );
    return response.data;
  };
  const editShipper = async (data: ShipperResponse) => {
    const response = await toast.promise(
      axios.patch<ShipperResponse>('/shippers/' + data.id, data),
      {
        loading: 'Loading shippers...',
        success: 'Loaded shippers successfully',
        error: 'Error loading shippers',
      }
    );
    return response.data;
  };

  const shippersData = data?.shippers ?? [];
  const totalShippers = data?.totalShippers ?? 0;
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
      createShipper,
      deleteShipper,
      editShipper,
      currentPage,
      shippersData,
      totalShippers,
      totalPages,
      action,
      setAction
    }),
    [
      handleChangePage,
      createShipper,
      deleteShipper,
      editShipper,
      currentPage,
      shippersData,
      totalShippers,
      totalPages,
      action,
      setAction
    ]
  );

  return (
    <ShippersPageContext.Provider
      value={contextValue}
    >
      {children}
    </ShippersPageContext.Provider>
  );
};
