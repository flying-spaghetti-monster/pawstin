import { Link } from "react-router";

import MiniCartBtn from "./components/MiniCartBtn";
import Logo from "./components/Logo";
// import SearchAppBar from "./Search";
import NavMenuLink from "./NavMenuLink";

const routes = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
];

function Navigation() {
  return (
  <nav className="container mx-auto flex items-center justify-between py-4">
      <Logo />
      <ul className="flex flex-row gap-4 text-3xl text-[#707071] ">
        {routes.map((route) => (
          <li key={route.name} className="mx-2">
            <NavMenuLink route={route} />
          </li>
        ))}
      </ul>
      {/* <SearchAppBar /> */}
      <MiniCartBtn />
    </nav>
    );
}

export default Navigation;

