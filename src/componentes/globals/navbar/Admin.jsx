import React, { useState } from "react";
import NewButton from "./NewButton";
import { useForm } from "react-hook-form";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./admin.css";

export default function Admin() {
  const { reset, register } = useForm({
    defaultValues: {
      title: "",
      category: "",
      image: "",
      initial: "",
      price: "",
      stock: "",
    },
  });
  const [adminValues, setAdminValues] = useState({
    user: "",
    password: "",
  });
  const [productValues, setProductValues] = useState({
    title: "",
    category: "",
    image: "",
    initial: "",
    price: "",
    stock: "",
  });
  const [access, setAccess] = useState(false);
  const [newButton, setNewButton] = useState(false);
  const db = getFirestore();
  const MySwal = withReactContent(Swal);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Function to valid the user and password with firebase:
  const loginValues = (e) => {
    setAdminValues({ ...adminValues, [e.target.name]: e.target.value });
  };

  const checkDetails = async () => {
    let adminLoginDetails = {};
    const queryCollection = collection(db, "admin");
    const queryCollectionFilter = await query(queryCollection);
    await getDocs(queryCollectionFilter).then((resp) => {
      resp.docs.forEach((doc) => {
        adminLoginDetails = doc.data();
      });
    });
    if (
      adminLoginDetails.user === adminValues.user &&
      adminLoginDetails.password === adminValues.password
    ) {
      setAccess(true);
    } else {
      MySwal.fire({
        title: "Error",
        text: "Usuario o contraseña incorrectos",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  const addProduct = () => {
    let product = {};
    product.title = productValues.title;
    product.category = productValues.category;
    product.image = productValues.image;
    product.initial = parseInt(productValues.initial);
    product.price = parseInt(productValues.price);
    product.stock = parseInt(productValues.stock);
    const queryCollection = collection(db, "products");
    addDoc(queryCollection, product)
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
    MySwal.fire({
      title: "Producto Agregado",
      text: "El producto se ha agregado correctamente",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#00bcd4",
    });
    setProductValues({
      title: "",
      category: "",
      image: "",
      initial: "",
      price: "",
      stock: "",
    });
    setNewButton(true);
  };

  const addProductValues = (e) => {
    setProductValues({ ...productValues, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {access === false ? (
        <form
          onSubmit={handleSubmit}
          className="d-flex card flex-column p-3 align-items-center container w-50 mt-5"
        >
          <h2>
            <u> Ingrese a su cuenta</u>
          </h2>
          <div className="input-group input-group-sm w-50 m-3 justify-content-end">
            <input
              {...register("user")}
              key="1"
              placeholder="Usuario"
              type="text"
              className="form-control inputStyle"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={loginValues}
            ></input>
          </div>
          <div className="input-group input-group-sm w-50">
            <input
              {...register("password")}
              key="2"
              placeholder="Constraseña"
              type="password"
              className="form-control inputStyle"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={loginValues}
            ></input>
          </div>
          <div className="mt-2">
            {adminValues.user !== adminValues.password &&
            adminValues.password.length >= 8 ? (
              <p className="text-danger mt-2">La contraseña es incorrecta</p>
            ) : null}
            <button
              onClick={() => {
                checkDetails();
              }}
              type="submit"
              className="btn btn-secondary"
            >
              Ingresar
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column p-3 align-items-center container w-50 mt-5"
        >
          <h2>
            <u> Agregar nuevo producto: </u>
          </h2>
          <div className="input-group input-group-sm w-50 mt-3 mb-2">
            <input
              {...register("title")}
              key="3"
              placeholder="Nombre del Producto"
              type="text"
              className="form-control inputStyle"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={addProductValues}
            ></input>
          </div>
          <div className="input-group input-group-sm w-50 mb-2">
            <input
              {...register("category")}
              key="4"
              placeholder="Categoria"
              type="text"
              className="form-control inputStyle"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={addProductValues}
            ></input>
          </div>
          <div className="input-group input-group-sm w-50 mb-2">
            <input
              {...register("image")}
              key="5"
              placeholder="URL de la imagen"
              type="text"
              className="form-control inputStyle"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={addProductValues}
            ></input>
          </div>
          <div className="input-group input-group-sm w-50 mb-2">
            <input
              {...register("initial")}
              key="6"
              placeholder="Cantidad inicial"
              type="number"
              className="form-control inputStyle"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={addProductValues}
            ></input>
          </div>
          <div className="input-group input-group-sm w-50 mb-2">
            <input
              {...register("price")}
              key="7"
              placeholder="Precio"
              type="number"
              className="form-control inputStyle"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={addProductValues}
            ></input>
          </div>
          <div className="input-group input-group-sm w-50">
            <input
              {...register("stock")}
              key="8"
              placeholder="Stock"
              type="number"
              className="form-control inputStyle"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={addProductValues}
            ></input>
          </div>
          <button
            onClick={() => {
              addProduct();
              reset();
            }}
            type="submit"
            className="btn btn-secondary w-25 mt-3"
          >
            Agregar Producto
          </button>
          {newButton ? <NewButton /> : null}
        </form>
      )}
    </div>
  );
}
