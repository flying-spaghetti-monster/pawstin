import { Outlet } from "react-router";

import { CartContextProvider } from "../context/CartContext";

import Footer from "../pages/Footer";
import Header from "../pages/Header";
import Navigation from "../pages/Navigation.tsx";

function SiteLayout() {
  return (
    <CartContextProvider>
      <Navigation />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </CartContextProvider>
  );
}

export default SiteLayout;
