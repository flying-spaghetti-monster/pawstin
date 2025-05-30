import { Link } from "react-router";
import { useCartStore } from "../stores/cartStore";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


//TODO: Implement MiniCartBtn
function MiniCartBtn() {
  const totalQuantity = useCartStore((state) => state.totalQuantity);
  console.log(totalQuantity )

  return (
    <div className="d-flex">
      <Link to="/cart" className="" type="submit">
        <ShoppingCartIcon />
        Cart
        <span className="px-2">
          ({totalQuantity})
        </span>
      </Link>
    </div>
  );
}

export default MiniCartBtn;
