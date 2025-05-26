import { Link } from "react-router";

type Props = {
  segments: string[];
};

export default function Breadcrumbs({ segments }: Props) {
  if (!segments.length) return null;

  return (
    <nav className="text-sm text-gray-600 my-4">
      <ol className="flex flex-wrap items-center space-x-1">
        <li>
          <Link to="/" className="text-blue-500 hover:underline">
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const label = decodeURIComponent(segment).replace(/-/g, " ");

          const isLast = index === segments.length - 1;

          return (
            <li key={href} className="flex items-center space-x-1">
              <span>/</span>
              {isLast ? (
                <span className="text-gray-800 capitalize">{label}</span>
              ) : (
                <Link
                  to={href}
                  className="text-blue-500 hover:underline capitalize"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
