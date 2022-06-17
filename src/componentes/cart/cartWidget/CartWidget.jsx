import { Link } from "react-router-dom";
import { ImCart } from "react-icons/im";

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
