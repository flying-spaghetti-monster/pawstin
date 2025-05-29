import { Link, useLocation } from "react-router";
import { cp } from '../../../hooks/utils';
import { CategoryResponse } from '../../../lib/types';

export default function NavMenuLink({
  route,
}: {
  route: CategoryResponse;
}) {
  const activePathName:string = useLocation().pathname;
  return (
    <>
      <Link
        to={route.slug}
        className={cp("text-3xl hover:text-[#4a4a4b] transition", {
          "text-[#141415]": activePathName === '/' +route.slug,
          "text-[#707071]": activePathName !== '/' +route.slug,
        })}
      >
        {route.category_name}
      </Link>
    </>
  );
}
