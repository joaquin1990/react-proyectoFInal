import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../../context/CartContext";

export default function InputCount() {
  const { totalItems } = useCartContext;
  return (
    <div>
      <Link to="/">
        <button className="m-1 btn btn-secondary">Continuar Comprando</button>
      </Link>
      <Link to="/cart">
        <button className="m-1 btn btn-secondary">
          Ir al Carrito a Realizar Pago
        </button>
      </Link>
    </div>
  );
}
