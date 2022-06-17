import React, { useEffect, useState } from "react";
import { useOrderContext } from "../../context/OrderContext";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { IoThumbsUpSharp } from "react-icons/io5";

export default function Payment() {
  const [count, setCount] = useState(0);
  const { orderId } = useOrderContext();

  useEffect(() => {
    setTimeout(() => {
      setCount(1);
    }, 3000);
  }, []);

  return (
    <div className="mt-3">
      {count === 0 ? (
        <span className="fs-5">
          <Spinner className="me-3" animation="border" variant="secondary" />. .
          . Procesando Pago
        </span>
      ) : (
        <div>
          <div className="card mt-4 w-50 m-auto p-4">
            {" "}
            <h1>
              <IoThumbsUpSharp /> Pago realizado con exito!
            </h1>
            <div className="m-auto mt-3">
              <div className=" d-flex row">
                <span className="fs-5">
                  Muchas gracias por confiar en nosotros!
                </span>
                <span className="fs-5">
                  Le hemos enviado un email con todos los datos de su compra!
                </span>
                <span className="fs-5">
                  Su numero de id es:{" "}
                  <p className="fw-bolder">
                    {" "}
                    <u>{orderId}</u>
                  </p>
                </span>
              </div>
            </div>
          </div>
          <Link to="/">
            <button className="btn btn-secondary m-4">
              Volver a la tienda
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
