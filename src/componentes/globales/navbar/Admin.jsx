import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import React, { useState } from "react";
import "./admin.css";

export default function Admin() {
  const [valuesAdmin, setValuesAdmin] = useState({
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
  const db = getFirestore();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Function to valid the user with the paseward in firebase
  const loginValues = (e) => {
    setValuesAdmin({ ...valuesAdmin, [e.target.name]: e.target.value });
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
      adminLoginDetails.user === valuesAdmin.user &&
      adminLoginDetails.password === valuesAdmin.password
    ) {
      setAccess(true);
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
              key="1"
              name="user"
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
              key="2"
              name="password"
              placeholder="Constraseña"
              type="password"
              className="form-control inputStyle"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={loginValues}
            ></input>
          </div>
          <button
            onClick={() => {
              checkDetails();
            }}
            type="submit"
            className="btn btn-secondary w-25 mt-3"
          >
            Ingresar
          </button>
        </form>
      ) : (
        //   Here is where it changes.
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column p-3 align-items-center container w-50 mt-5"
        >
          <h2>
            <u> Agregar nuevo producto: </u>
          </h2>
          <div className="input-group input-group-sm w-50 mt-3 mb-2">
            <input
              key="3"
              name="title"
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
              key="4"
              name="category"
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
              key="5"
              name="image"
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
              key="6"
              name="initial"
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
              key="7"
              name="price"
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
              key="8"
              name="stock"
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
            }}
            type="submit"
            className="btn btn-secondary w-25 mt-3"
          >
            Agregar Producto
          </button>
        </form>
      )}
    </div>
  );
}
