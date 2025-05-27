import { BrowserRouter as Router, Routes, Route } from "react-router";


import SiteLayout from "./layouts/SiteLayout";
import AdminLayout from "./layouts/AdminLayout";

//general

import { ScrollToTop } from './pages/admin/components/common/ScrollToTop';

//site
import Home from "./pages/Home";
import Plp from "./pages/Plp";
import Pdp from "./pages/Pdp";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

//Sign
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

//admin
import NotFound from "./pages/admin/OtherPage/NotFound";
import UserProfiles from "./pages/admin/UserProfiles";
import Videos from "./pages/admin/UiElements/Videos";
import Images from "./pages/admin/UiElements/Images";
import Buttons from "./pages/admin/UiElements/Buttons";
import LineChart from "./pages/admin/Charts/LineChart";
import BarChart from "./pages/admin/Charts/BarChart";
import BasicTables from "./pages/admin/Tables/BasicTables";
import FormElements from "./pages/admin/Forms/FormElements";
import Blank from "./pages/admin/Blank";

// pages
import AdminHome from "./pages/admin/Dashboard/Home";
import AdminProducts from "./pages/admin/Products/Products";
import AdminCategories from "./pages/admin/Categories/Categories";
import AdminOrders from "./pages/admin/Orders/Orders";
import AdminCustomers from "./pages/admin/Customers/Customers";


// Importing ProtectedRoute to protect admin routes
import ProtectedRoute from './pages/components/ProtectedRoute';

function App() {
  return (
    <Router>
      <ScrollToTop /> 
      <Routes>
        {/* Site */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Plp />} />
          <Route path="product/:id" element={<Pdp />} />
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

          {/* Products Page */}
          <Route path="admin/products" element={<AdminProducts />} />
          {/* Products Page */}
          <Route path="admin/categories" element={<AdminCategories />} />

          {/* Orders Page */}
          <Route path="admin/orders" element={<AdminOrders />} />

          {/* Customers Page */}
          <Route path="admin/customers" element={<AdminCustomers />} />
          
          {/* Others Page */}
          <Route path="admin/profile" element={<UserProfiles />} />
          <Route path="admin/blank" element={<Blank />} />

          {/* Forms */}
          <Route path="admin/form-elements" element={<FormElements />} />

          {/* Tables */}
          <Route path="admin/basic-tables" element={<BasicTables />} />

        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
