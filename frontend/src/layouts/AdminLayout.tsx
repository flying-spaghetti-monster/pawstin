import '../addmin.css';
import 'swiper/swiper-bundle.css';
import 'flatpickr/dist/flatpickr.css';
import toast, { Toaster } from 'react-hot-toast';
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { getToken } from '../helper/localSorageHelper';
import { CustomersPageProvider } from '../context/CustomersPageContext';
import { CategoriesPageProvider } from '../context/CategoriesPageContext';
import { ProductsPageProvider } from '../context/ProductsPageContext';
import { ShippersPageProvider } from '../context/ShippersPageContext';
import { OrdersPageProvider } from '../context/OrdersPageContext';


const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
        <Toaster toastOptions={{
          style: {
            zIndex: 9999, // higher than modal (adjust as needed)
          },
        }} />
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

const AppLayout: React.FC = () => {
  if (!getToken()) {
    toast.success("User already logged out! Redirecting to signin page...");
    return <Navigate to="/signin" replace />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <CustomersPageProvider>
      <CategoriesPageProvider>
      <ProductsPageProvider>
      <OrdersPageProvider>
      <ShippersPageProvider>
      <SidebarProvider>
        <LayoutContent />
      </SidebarProvider>
      </ShippersPageProvider>
      </OrdersPageProvider>
      </ProductsPageProvider>
      </CategoriesPageProvider>
      </CustomersPageProvider>
    </QueryClientProvider>
  );
};

export default AppLayout;
