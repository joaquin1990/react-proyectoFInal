import Input from "./Input";
import { useOrderContext } from "../../context/OrderContext";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Form1() {
  const { generateOrder, updateStock, emptyCart } = useOrderContext();
  const [values, setValues] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    phone: "",
  });
  const [disable, setDisable] = useState(true);

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      pattern: "[a-z A-Z]*",
      errorMessage: "Ingrese un nombre completo válido",
      placeholder: "Nombre y Apellido",
      required: true,
      label: "Nombre y Apellido",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}",
      errorMessage: "Ingrese un email válido",
      placeholder: "Email",
      required: true,
      label: "Email",
    },
    {
      id: 3,
      name: "confirmEmail",
      type: "email",
      pattern: values.email,
      errorMessage: "Los emails no coinciden",
      placeholder: "Confirmar Email",
      required: true,
      label: "Confirmar Email",
    },
    {
      id: 4,
      name: "phone",
      type: "tel",
      pattern: "^[0-9]{8,14}$",
      errorMessage: "Ingrese un teléfono válido",
      placeholder: "Teléfono",
      required: true,
      label: "Teléfono",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (
      /^[0-9]{8,14}$/.test(values.phone) &&
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        values.email
      ) &&
      /[a-z A-Z]/.test(values.name) &&
      values.confirmEmail === values.email
    ) {
      setDisable(false);
    }
  }, [values]);

  useEffect(() => {
    if (
      !/^[0-9]{8,14}$/.test(values.phone) ||
      !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        values.email
      ) ||
      !/[a-z A-Z]/.test(values.name) ||
      values.confirmEmail !== values.email
    ) {
      setDisable(true);
    }
  }, [values]);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="text-center p-3 m-5 w-75 m-auto mt-5 "
      >
        <h3 className="">
          <u>Ultimo paso!</u>
        </h3>
        <p className="mb-3 fs-4">Completa el Siguiente Formulario:</p>
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <Link to="/Payment">
          {" "}
          <button
            onClick={() => {
              generateOrder(values);
              updateStock();
              emptyCart();
            }}
            className="btn btn-success mt-2 w-25 sm m-auto"
            disabled={disable}
          >
            Finalizar compra
          </button>
        </Link>
      </form>
    </div>
  );
}
