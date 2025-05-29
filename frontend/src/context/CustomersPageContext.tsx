import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { PageDirection, UserAddressResponse } from '../lib/types';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {instance as axios} from '../api/axios';

type CustomersPageContextType = {
  currentPage: number;
  usersData: UserAddressResponse[];
  totalUsers: number;
  totalPages: number;
  handleChangePage: (direction: PageDirection) => void;
};

const CustomersPageContext = createContext<CustomersPageContextType | undefined>(undefined);

export const useCustomersPage = () => {
  const context = useContext(CustomersPageContext);
  if (!context) {
    throw new Error("useCustomersPage must be used within a CustomersPageProvider");
  }
  return context;
};

type customersResponse = {
  users: UserAddressResponse[],
  totalUsers: number,
  totalPages: number
}

export const CustomersPageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useQuery<customersResponse>({
    queryKey: ['admin-customers', currentPage],
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
    queryFn: async () => {
      const response = await toast.promise(
        axios.get<customersResponse>('/auth/getUsers?page=' + currentPage),
        {
          loading: 'Loading customers...',
          success: 'Loaded customers successfully',
          error: 'Error loading customers',
        }
      );
      return response.data;
    }
  })

  const usersData = data?.users ?? [];
  const totalUsers = data?.totalUsers ?? 0;
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
      currentPage,
      usersData,
      totalUsers,
      totalPages
    }),
    [
      handleChangePage,
      currentPage,
      usersData,
      totalUsers,
      totalPages
    ]
  );

  return (
    <CustomersPageContext.Provider
      value={contextValue}
    >
      {children}
    </CustomersPageContext.Provider>
  );
};
