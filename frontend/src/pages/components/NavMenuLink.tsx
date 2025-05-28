"use client";

import { Link } from "react-router";
import { cp } from '../../hooks/utils';

export default function NavMenuLink({
  route,
}: {
  route: { name: string; path: string };
}) {
  // const activePathName = usePathname();
  const activePathName: string = 'home';
  return (
    <>
      <Link
        to={route.path}
        className={cp("text-3xl hover:text-[#4a4a4b] transition", {
          "text-[#141415]": activePathName === route.path,
          "text-[#707071]": activePathName !== route.path,
        })}
      >
        {route.name}
      </Link>
    </>
  );
}
