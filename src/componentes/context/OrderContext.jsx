import { createContext, useState, useEffect } from "react";
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
  const [cartList, setCartList] = useState([]);
  const [count, setCount] = useState(0);
  const { totalPrice } = useCartContext();
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

  // Function to know how many stock is left in the item that is selected:
  async function checkStock(id, quantity) {
    let item = {};
    const queryCollection = collection(db, "products");
    // como hacer para buscar por id igual al id que le estamos pasando con el parametro.
    const queryCollectionFilter = await query(
      queryCollection,
      where(documentId(), "==", id)
    );
    await getDocs(queryCollectionFilter).then((resp) => {
      resp.docs.forEach((doc) => {
        item = doc.data();
      });
    });
    //To make sure the quantity is not higher than the stock when stock is not 0:
    if (item.stock > 0 && item.stock < quantity) {
      alert(`Contamos unicamente con ${item.stock} unidad/es de este producto`);
      return false;
    }
    // When stock is higher than quantity selected, or, there is no stock:
    if (item.stock >= quantity) {
      return true;
    } else
      alert(`Lamentablemente no contamos con mas stock de "${item.title}"`);
    return false;
  }

  // Also transform this function into an async function:
  // Transform this function into a ansync function:

  async function isInCart(item) {
    let index = cartList.findIndex((prod) => prod.id === item.id);
    if (index > -1) {
      return true;
    } else return false;
  }

  async function addToCart(item) {
    if (checkStock) {
      // Cart is empty:
      if (cartList.length === 0) {
        await setCartList([...cartList, item]);
        console.log("Entro en el 1ero");
        // Cart is not empty, and item is not in the cart:
      } else if (cartList.length > 0 && isInCart(item) === false) {
        await setCartList([...cartList, item]);
        console.log("Entro en el 2do");
        // Item is already in cart:
      } else if (isInCart(item)) {
        let index = cartList.findIndex((prod) => prod.id === item.id);
        cartList[index].quantity = cartList[index].quantity + item.quantity;
        console.log("Entro en el 3ro");
      }
      console.log(cartList);
      // let index = cartList.findIndex((prod) => prod.id === item.id);
      // if (isInCart(item)) {
      //   cartList[index].quantity = cartList[index].quantity + item.quantity;
      // } else setCartList([...cartList, item]);
    }
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

  //  // Funcion para quitar items del cart:
  //  function removeItem(item) {
  //   const newCart = cartList.filter((prod) => prod.id !== item.id);
  //   setCartList(newCart);
  // }

  // Funcion para vaciar el carrito:
  function emptyCart() {
    setCartList([]);
  }

  return (
    <OrderContext.Provider
      value={{ generateOrder, updateStock, checkStock, addToCart, emptyCart }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
