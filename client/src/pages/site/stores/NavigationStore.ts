import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CategoryResponse } from '../../../lib/types';
import axios from 'axios';

interface CategoryStore {
  items: CategoryResponse[];
  loading: boolean;
  fetchCategories: () => Promise<void>;
}

export const useMainMenu = create<CategoryStore>()(
  persist(
    (set) => ({
      items: [],
      loading: false,
      fetchCategories: async () => {
        set({ loading: true });
        try {
          const response = await axios.get<{ categories: CategoryResponse[] }>(
            'http://localhost:3000/api/categories/findAll?isActive=true'
          );
          const routes = [
            { category_name: "Home", slug: "/" },
            ...response.data.categories,
            { category_name: "About", slug: "about" }
          ];
          set({ items: routes });
        } catch (error) {
          console.error('Failed to fetch categories:', error);
        } finally {
          set({ loading: false });
        }
      }
    }),
    {
      name: 'main-menu-store', // Назва ключа в localStorage
    }
  )
);