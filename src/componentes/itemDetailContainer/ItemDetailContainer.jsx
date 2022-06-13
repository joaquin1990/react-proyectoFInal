import React from "react";
import ItemDetail from "./itemDetail/ItemDetail";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Spinner } from "react-bootstrap";

export default function ItemDetailContainer() {
  const [loader, setLoader] = useState(true);
  const [product, setProduct] = useState({});
  const { id2 } = useParams();

  const getSelectedProduct = (query) => {
    getDoc(query)
      .then((resp) => setProduct({ id: resp.id, ...resp.data() }))
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    setTimeout(() => {
      const db = getFirestore();
      const dbQuery = doc(db, "products", id2);
      getSelectedProduct(dbQuery);
    }, 500);
  }, [id2]);

  return (
    <div className="m-5">
      {loader ? (
        <span className="fs-5">
          <Spinner className="me-3" animation="border" variant="secondary" />. .
          . Cargando Detalles del Producto
        </span>
      ) : (
        <ItemDetail item={product} />
      )}
    </div>
  );
}
