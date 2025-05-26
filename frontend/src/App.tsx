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
import Alerts from "./pages/admin/UiElements/Alerts";
import Badges from "./pages/admin/UiElements/Badges";
import Avatars from "./pages/admin/UiElements/Avatars";
import Buttons from "./pages/admin/UiElements/Buttons";
import LineChart from "./pages/admin/Charts/LineChart";
import BarChart from "./pages/admin/Charts/BarChart";
import Calendar from "./pages/admin/Calendar";
import BasicTables from "./pages/admin/Tables/BasicTables";
import FormElements from "./pages/admin/Forms/FormElements";
import Blank from "./pages/admin/Blank";
import AdminHome from "./pages/admin/Dashboard/Home";


function App() {
  console.log('App')
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
        <Route element={<AdminLayout />}>
            <Route index path="/admin" element={<AdminHome />} />

            {/* Others Page */}
            <Route path="admin/profile" element={<UserProfiles />} />
            <Route path="admin/calendar" element={<Calendar />} />
            <Route path="admin/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="admin/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="admin/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="admin/alerts" element={<Alerts />} />
            <Route path="admin/avatars" element={<Avatars />} />
            <Route path="admin/badge" element={<Badges />} />
            <Route path="admin/buttons" element={<Buttons />} />
            <Route path="admin/images" element={<Images />} />
            <Route path="admin/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="admin/line-chart" element={<LineChart />} />
            <Route path="admin/bar-chart" element={<BarChart />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
