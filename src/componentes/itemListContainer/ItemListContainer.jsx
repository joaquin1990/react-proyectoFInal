import ItemList from "./itemList/ItemList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Spinner } from "react-bootstrap";

export default function ItemListContainer() {
  const [items, setItems] = useState([]);
  const [loader, setLoader] = useState(true);
  const { id } = useParams();

  const getDifferentCollections = (queryCollection) => {
    getDocs(queryCollection)
      .then((resp) =>
        setItems(resp.docs.map((item) => ({ id: item.id, ...item.data() })))
      )
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    const db = getFirestore();
    const queryCollection = collection(db, "products");

    if (id) {
      const queryCollectionFilter = query(
        queryCollection,
        where("category", "==", id)
      );
      getDifferentCollections(queryCollectionFilter);
    } else {
      getDifferentCollections(queryCollection);
    }
  }, [id]);

  return (
    <div className="mt-5 mb-5 container m-auto">
      {loader ? (
        <span className="fs-5 mt-5">
          <Spinner className="me-3" animation="border" variant="secondary" />. .
          . Cargando Productos
        </span>
      ) : (
        <ItemList items={items} />
      )}
    </div>
  );
}
