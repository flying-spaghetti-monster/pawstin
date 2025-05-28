import "../site.css";

import { Outlet } from "react-router";
import { CartContextProvider } from "../context/CartContext";
import Footer from "../pages/components/Footer.tsx";
import Navigation from "../pages/components/Navigation.tsx";

function SiteLayout() {
  return (
    <CartContextProvider>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </CartContextProvider>
  );
}

export default SiteLayout;
