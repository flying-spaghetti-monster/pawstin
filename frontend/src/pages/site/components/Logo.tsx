import { Link } from "react-router";

export default function Logo() {
  return (
    <Link to="/">
      <img
        src="/logo.png"
        alt="Pawstin Logo"
        width="180"
        height="40"
        className="site-logo"
      />
    </Link>
  );
}
