import { useOrderContext } from "../../context/OrderContext";
import "./Navbar.css";
import CartWidget from "../../cart/cartWidget/CartWidget";
import { Link } from "react-router-dom";

function NavBar() {
  const { totalItems } = useOrderContext();
  return (
    <header>
      <nav className="navDeco">
        <div className="w-100 d-flex align-items-center h-100 container">
          <Link to="/" style={{ textDecoration: "none", color: "grey" }}>
            <p className="claireDeco ">Claire</p>
          </Link>
          <div className="d-flex w-100 container">
            <div className="w-100  d-flex ">
              <ul className="navbar-nav w-100 flex-row justify-content-end align-items-center liDeco  mt-2 me-2">
                <li className="nav-item active p-2">
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "grey" }}
                  >
                    <p className="nav-link fs-5 ">Home</p>
                  </Link>
                </li>
                <li className="nav-item p-2">
                  <Link
                    to="/category/Aromatizante"
                    style={{ textDecoration: "none", color: "grey" }}
                  >
                    <p className="nav-link fs-5 ">Aromatizantes</p>
                  </Link>
                </li>
                <li className="nav-item p-2">
                  <Link
                    to="/category/Vela"
                    style={{ textDecoration: "none", color: "grey" }}
                  >
                    <p className="nav-link fs-5 ">Velas</p>
                  </Link>
                </li>
                <li className="nav-item active p-2">
                  <Link
                    to="/admin"
                    style={{ textDecoration: "none", color: "grey" }}
                  >
                    <p className="nav-link fs-5 ">Login</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex align-items-center">
            {totalItems() !== 0 ? (
              <div className="justify-content-end">
                <p className="mt-2 me-1">{totalItems()}</p>
              </div>
            ) : null}
            <div className="justify-content-end ">
              <CartWidget />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
