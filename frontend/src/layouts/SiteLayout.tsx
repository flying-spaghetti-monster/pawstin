import "../site.css";

import { Outlet } from "react-router";
import { CartContextProvider } from "../context/CartContext";
import Footer from "../pages/site/Footer.tsx";
import Navigation from "../pages/site/components/Navigation.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function SiteLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        {/* <Navigation /> */}
        <main>
          <Outlet />
        </main>
        <Footer />
      </CartContextProvider>
    </QueryClientProvider>
  );
}

export default SiteLayout;
