import { Link } from "react-router";
import { useCartStore } from "../../stores/cartStore";
// import { IoCart } from "react-icons/io5";

function MiniCartBtn() {
  const quantity = useCartStore((state) => state.qty);

  return (
    <div className="d-flex">
      <Link to="/cart" className="btn btn-outline-dark" type="submit">
        {/* <IoCart /> */}
        Cart
        <span className="badge bg-dark text-white ms-1 rounded-pill">
          {quantity}
        </span>
      </Link>
    </div>
  );
}

export default MiniCartBtn;
