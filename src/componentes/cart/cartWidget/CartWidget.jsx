import { ImCart } from "react-icons/im";
import { Link } from "react-router-dom";

function CartWidget({ cartQuantity }) {
  return (
    <div>
      <Link to="/cart" style={{ textDecoration: "none", color: "grey" }}>
        <h3 className="me-4">
          <ImCart />{" "}
        </h3>
      </Link>
    </div>
  );
}

export default CartWidget;
