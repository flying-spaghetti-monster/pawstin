import { BrowserRouter as Router, Routes, Route } from "react-router";


import SiteLayout from "./layouts/SiteLayout";
import AdminLayout from "./layouts/AdminLayout";

//general

import { ScrollToTop } from './pages/admin/components/common/ScrollToTop';

//site
import Home from "./pages/site/homePage/Home";
import Category from "./pages/site/categoryPage/Category";
import Product from "./pages/site/productPage/Product";
import About from "./pages/site/aboutPage/About";
import Cart from "./pages/site/cartPage/Cart";
import Checkout from "./pages/site/checkoutPage/Checkout";

//Sign
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

//admin
import NotFound from "./pages/admin/NotFound";
import UserProfiles from "./pages/admin/UserProfiles";
import Blank from "./pages/admin/Blank";

import AdminHome from "./pages/admin/dashboardPage/Home";
import AdminProducts from "./pages/admin/productsPage/Products";
import AdminCategories from "./pages/admin/categoriesPage/Categories";
import AdminOrders from "./pages/admin/ordersPage/OrdersPage";
import AdminCustomers from "./pages/admin/customersPage/Customers";
import AdminShippers from "./pages/admin/shippersPage/Shippers";


// Importing ProtectedRoute to protect admin routes
import ProtectedRoute from './layouts/ProtectedRoute';

function App() {
  return (
    <Router>
      <ScrollToTop /> 
      <Routes>
        {/* Site */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path=":category" element={<Category />} />
          <Route path=":category/:id" element={<Product />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        {/* Auth Layout */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Dashboard Layout */}

        <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index path="/admin" element={<AdminHome />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/categories" element={<AdminCategories />} />
          <Route path="admin/shippers" element={<AdminShippers />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/customers" element={<AdminCustomers />} />
          
          {/* Others Page */}
          <Route path="admin/profile" element={<UserProfiles />} />
          <Route path="admin/blank" element={<Blank />} />

        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
