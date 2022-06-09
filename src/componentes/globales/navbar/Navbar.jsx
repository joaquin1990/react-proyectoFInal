import "./Navbar.css";
import CartWidget from "../../cart/cartWidget/CartWidget";
import { Link } from "react-router-dom";
import { useOrderContext } from "../../context/OrderContext";

function NavBar() {
  const { totalItems, cartList } = useOrderContext();
  return (
    <header>
      <nav className="navDeco">
        <div className="w-100 d-flex align-items-center h-100">
          <Link to="/" style={{ textDecoration: "none", color: "grey" }}>
            <p className="claireDeco ms-5">Claire</p>
          </Link>
          <div className="d-flex w-75 container">
            {/* <div className="d-flex flex-column p-3 align-items-start container w-50">
              <div className="input-group input-group-sm w-25 p-2 justify-content-end">
                <input
                  placeholder="Usuario"
                  type="text"
                  className="form-control "
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                ></input>
              </div>
              <div className="input-group input-group-sm w-25  p-2">
                <input
                  placeholder="Constraseña"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                ></input>
              </div>
            </div> */}
            <div className="w-100  d-flex ">
              <ul className="navbar-nav w-100 flex-row justify-content-end align-items-center liDeco  mt-2 me-2">
                <li className="nav-item active p-2">
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "grey" }}
                  >
                    <p className="nav-link ">Home</p>
                  </Link>
                </li>
                <li className="nav-item p-2">
                  <Link
                    to="/category/Aromatizante"
                    style={{ textDecoration: "none", color: "grey" }}
                  >
                    <p className="nav-link">Aromatizantes</p>
                  </Link>
                </li>
                <li className="nav-item p-2">
                  <Link
                    to="/category/Vela"
                    style={{ textDecoration: "none", color: "grey" }}
                  >
                    <p className="nav-link">Velas</p>
                  </Link>
                </li>
                <li className="nav-item active p-2">
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "grey" }}
                  >
                    <p className="nav-link">Login</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex align-items-center">
            {" "}
            {/* Aca va condicional para que o se muestre si tiene items o no se muestre si no tiene nada. */}
            {totalItems() !== 0 ? (
              <div className="justify-content-end">
                {" "}
                <p className="fw-bolder">{totalItems()}</p>{" "}
              </div>
            ) : null}
            <div className="justify-content-end me-5 ms-2">
              <CartWidget />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
