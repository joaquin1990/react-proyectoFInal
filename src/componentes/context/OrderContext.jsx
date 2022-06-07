import { createContext, useState } from "react";
import { useContext } from "react";
import { useCartContext } from "./CartContext";
import {
  addDoc,
  collection,
  documentId,
  getDocs,
  getFirestore,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

const OrderContext = createContext([]);
export const useOrderContext = () => useContext(OrderContext);

const OrderContextProvider = ({ children }) => {
  const { cartList, totalPrice } = useCartContext();
  const [actualStock, setActualStock] = useState();
  const db = getFirestore();

  // Next function is to create a new order in the database:
  function generateOrder(client) {
    let order = {};
    order.buyer = client;
    order.total = totalPrice();
    order.items = cartList.map((item) => {
      const id = item.id;
      const title = item.title;
      const quantity = item.quantity;
      const price = item.price;
      return { id, title, quantity, price };
    });
    const queryCollection = collection(db, "orders");
    addDoc(queryCollection, order)
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  }

  // Function to make sure there is enough stock of the items in the cart:
  async function checkStock(id) {
    let actualStock = {};
    const queryCollection = collection(db, "products");

    const queryCollectionFilter = await query(
      queryCollection,
      where(documentId(), "==", id)
      // como hacer para buscar por id igual al id que le estamos pasando con el parametro.
    );
    await console.log(queryCollectionFilter);
    await getDocs(queryCollectionFilter).then((resp) =>
      resp.docs.forEach((item) => {
        const id = item.id;
        const title = item.data().title;
        const stock = item.data().stock;
        const quantity = cartList.find((item) => item.id === id).quantity;
        actualStock = { id, title, stock, quantity };
        console.log(actualStock);
      })
    );
  }

  // Function to update the stock of the products in firebase
  async function updateStock() {
    const queryCollectionStock = collection(db, "products");
    const queryNewStock = await query(
      queryCollectionStock,
      where(
        documentId(),
        "in",
        cartList.map((item) => item.id)
      )
    );
    const batch = writeBatch(db);
    await getDocs(queryNewStock)
      .then((resp) =>
        resp.docs.forEach((res) =>
          batch.update(res.ref, {
            stock:
              res.data().stock -
              cartList.find((item) => item.id === res.id).quantity,
          })
        )
      )
      .finally(() => console.log("actualizado"));
    batch.commit();
  }

  return (
    <OrderContext.Provider value={{ generateOrder, updateStock, checkStock }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
