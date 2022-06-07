// import React, { useState } from "react";
import "./Navbar.css";
import CartWidget from "../../cart/cartWidget/CartWidget";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";

function NavBar() {
  const { totalItems } = useCartContext();
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light navDeco d-flex">
        <Link to="/" style={{ textDecoration: "none", color: "grey" }}>
          <p className="claireDeco ms-5 text-start">Claire</p>
        </Link>

        <button
          className="navbar-toggler mx-5"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse menuDeco" id="navbarNav">
          <ul className="navbar-nav container mx-1 listDeco">
            <li className="nav-item active">
              <Link to="/" style={{ textDecoration: "none", color: "grey" }}>
                <p className="nav-link">Home</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/category/Aromatizante"
                style={{ textDecoration: "none", color: "grey" }}
              >
                <p className="nav-link">Aromatizantes</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/category/Vela"
                style={{ textDecoration: "none", color: "grey" }}
              >
                <p className="nav-link">Velas</p>
              </Link>
            </li>
          </ul>
        </div>
        {/* Aca va condicional para que o se muestre si tiene items o no se muestre si no tiene nada. */}
        {totalItems() !== 0 ? <div className="m-2"> {totalItems()}</div> : null}
        <CartWidget />
      </nav>
    </header>
  );
}

export default NavBar;
