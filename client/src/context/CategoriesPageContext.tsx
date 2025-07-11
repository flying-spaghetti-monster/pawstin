import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { PageDirection, CategoryResponse, Actions } from '../lib/types';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { instance as axios } from '../api/axios';

type CategoriesPageContextType = {
  currentPage: number;
  categoriesData: CategoryResponse[];
  totalCategories: number;
  totalPages: number;
  action: Actions,
  handleChangePage: (direction: PageDirection) => void;
  createCategory: (data: object) => Promise<CategoryResponse>;
  deleteCategory: (slug: string) => void;
  editCategory: (data: CategoryResponse) => Promise<CategoryResponse>;
  setAction: React.Dispatch<React.SetStateAction<Actions>>;
};

const CategoriesPageContext = createContext<CategoriesPageContextType | undefined>(undefined);

export const useCategoriesPage = () => {
  const context = useContext(CategoriesPageContext);
  if (!context) {
    throw new Error("useCategoriesPage must be used within a CategoriesPageProvider");
  }
  return context;
};

type categoriesResponse = {
  categories: CategoryResponse[],
  totalCategories: number,
  totalPages: number
}

export const CategoriesPageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [action, setAction] = useState<Actions>(Actions.CREATE);

  const { data, error } = useQuery<categoriesResponse, Error, categoriesResponse, [string, number, Actions]>({
    queryKey: ['admin-categories', currentPage, action],
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const response = await toast.promise(
        axios.get('/categories/findAll?page=' + currentPage),
        {
          loading: 'Loading categories...',
          success: 'Loaded categories successfully',
          error: 'Error loading categories',
        }
      );
      return response.data;
    }
  })

  // const createCategory = async (formData: object) => {
  //   const response = await toast.promise(
  //     axios.post<CategoryResponse>('/categories/create', formData),
  //     {
  //       loading: 'Loading categories...',
  //       success: 'Loaded categories successfully',
  //       error: 'Error loading categories',
  //     }
  //   );
  //   console.log(response)
  //   // if (response) {
  //   //   console.log(error)
  //   //   throw error;
  //   // }
  //   return response.data;
  // };

  const createCategory = async (data: CategoryResponse) => {
    console.log(data)
    return toast.promise(
      axios.post<CategoryResponse>('/categories/create', data),
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

  const deleteCategory = async (slug: string) => {
    const response = await toast.promise(
      axios.delete<CategoryResponse>('/categories/delete' + `/${slug}`),
      {
        loading: 'Delete category...',
        success: 'Deleted category successfully',
        error: 'Error delete category',
      }
    );
    return response.data;
  };
  const editCategory = async (newData: CategoryResponse) => {
    const response = await toast.promise(
      axios.patch<CategoryResponse>('/categories/' + newData.slug, newData),
      {
        loading: 'Loading categories...',
        success: 'Loaded categories successfully',
        error: 'Error loading categories',
      }
    );
    return response.data;
  };

  const categoriesData = data?.categories ?? [];
  const totalCategories = data?.totalCategories ?? 0;
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
      createCategory,
      deleteCategory,
      editCategory,
      currentPage,
      categoriesData,
      totalCategories,
      totalPages,
      action,
      setAction
    }),
    [
      handleChangePage,
      createCategory,
      deleteCategory,
      editCategory,
      currentPage,
      categoriesData,
      totalCategories,
      totalPages,
      action,
      setAction
    ]
  );

  return (
    <CategoriesPageContext.Provider
      value={contextValue}
    >
      {children}
    </CategoriesPageContext.Provider>
  );
};
