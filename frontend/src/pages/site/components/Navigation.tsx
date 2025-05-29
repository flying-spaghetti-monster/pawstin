import { CategoryResponse } from '../../../lib/types';
import MiniCartBtn from "./MiniCartBtn";
import Logo from "./Logo";
import NavMenuLink from "./NavMenuLink";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useMainMenu } from "../stores/NavigationStore";
import { useEffect } from 'react';


function Navigation() {
  console.log("Navigation");
  const { items, fetchCategories } = useMainMenu();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  console.log(items);

 //TODO: implement SearchAppBar
  return (
  <nav className="container mx-auto flex items-center justify-between p-4">
      <Logo />
      <ul className="flex flex-row gap-4 text-3xl text-[#707071] ">
        {items && items.map((route) => (
          <li key={route.category_name} className="mx-2">
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

