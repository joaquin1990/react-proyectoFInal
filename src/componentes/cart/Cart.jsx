import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
// import { useOrderContext } from "../context/OrderContext";

export default function Cart() {
  const [bool, setBool] = useState(false);
  const { cartList, emptyCart, removeItem, totalPrice, totalItems } =
    useCartContext();

  const handleClick = () => {
    setBool(!bool);
  };

  // Condicional para que en el caso de que el carrito este vacio, nos permita volver a la tienda a seguir comprando.
  if (cartList.length === 0) {
    return (
      <h2 className="m-4 mt-5">
        No tiene productos en el carrito!{" "}
        <Link to="/">
          {" "}
          <button className="btn btn-secondary">Volver a la tienda</button>
        </Link>
      </h2>
    );
  }
  totalItems();
  return (
    <div className="d-flex row my-5 w-75 m-auto">
      <div className="border-secondary p-3">
        <h1 className="p-2">
          <u>Carrito</u>
        </h1>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Producto</th>
              <th scope="col">Nombre del Producto</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Quitar</th>
            </tr>
          </thead>
          <tbody>
            {cartList.map((i, index) => (
              <tr key={i.id}>
                <th scope="row">{index + 1}</th>
                <th scope="row">
                  <img alt={index} src={i.image} style={{ width: "3.5rem" }} />
                </th>
                <td>{i.title}</td>
                <td>{i.price}</td>
                <td>{i.quantity}</td>
                <td>
                  <button
                    onClick={() => removeItem(i)}
                    className="btn btn-danger"
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className=" d-flex row ">
          <div className="d-flex  justify-content-between">
            <button className="btn h-75 mt-1 btn-danger" onClick={emptyCart}>
              Vaciar Carrito
            </button>
            <span className="fs-4 my-2 w-25">
              <u> Precio Total: $ {totalPrice()}</u>
            </span>
          </div>
        </div>

        <div className="col-4 container d-flex row m-auto w-75 my-2">
          <Link className="m-auto" to="/form">
            <button
              className="btn btn-success w-25 mt-3"
              onClick={() => {
                handleClick();
              }}
            >
              Realizar Compra
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
