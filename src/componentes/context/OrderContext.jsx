import { createContext, useState } from "react";
import { useContext } from "react";
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
  const [countOrder, setCountOrder] = useState(0);
  const [orderId, setOrderId] = useState(null);
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
      .then(({ id }) => setOrderId(id))
      .then((resp) => console.log(resp))
      .then((resp) => console.log(resp.id))
      .catch((err) => console.log(err));
  }

  // Function to know how many stock is left in the item that is selected:
  async function checkStock(item, quantity) {
    let itemSelected = {};
    const queryCollection = collection(db, "products");
    // como hacer para buscar por id igual al id que le estamos pasando con el parametro.
    const queryCollectionFilter = await query(
      queryCollection,
      where(documentId(), "==", item.id)
    );
    await getDocs(queryCollectionFilter).then((resp) => {
      resp.docs.forEach((doc) => {
        itemSelected = doc.data();
      });
    });
    //To make sure the quantity is not higher than the stock when stock is not 0:
    if (itemSelected.stock > 0 && itemSelected.stock < quantity) {
      alert(
        `Contamos unicamente con ${itemSelected.stock} unidad/es de este producto`
      );
      return false;
    }
    // When stock is higher than quantity selected, or, there is no stock:
    if (itemSelected.stock >= quantity) {
      return addToCart({ ...item, quantity: quantity });
    } else
      alert(
        `Lamentablemente no contamos con mas stock de "${itemSelected.title}"`
      );
    return false;
  }

  //  Function to add items to the cart:
  async function addToCart(item) {
    let index = cartList.findIndex((prod) => prod.id === item.id);
    // Cart is empty:
    if (cartList.length === 0) {
      return setCartList([item]);
      // Cart is not empty, and item is not in the cart:
    } else if (cartList.length > 0 && index === -1) {
      return setCartList([...cartList, item]);
      // Item is already in cart:
    } else if (index > -1) {
      // Add item.quantity to the quantity of the item in the cart:
      return setCartList(
        cartList.map((prod) =>
          prod.id === item.id
            ? { ...prod, quantity: prod.quantity + item.quantity }
            : prod
        )
      );
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

  function totalPrice() {
    const totPrice = cartList.reduce((acc, item) => {
      acc += item.price * item.quantity;
      return acc;
    }, 0);
    return totPrice;
  }

  // Funcion para quitar items del cart:
  function removeItem(item) {
    const newCart = cartList.filter((prod) => prod.id !== item.id);
    setCartList(newCart);
  }

  // Funcion para vaciar el carrito:
  function emptyCart() {
    setCartList([]);
  }

  function totalItems() {
    return cartList.reduce((acc, cur) => (acc += cur.quantity), 0);
  }

  return (
    <OrderContext.Provider
      value={{
        generateOrder,
        updateStock,
        checkStock,
        addToCart,
        totalPrice,
        emptyCart,
        removeItem,
        totalItems,
        cartList,
        setCartList,
        countOrder,
        setCountOrder,
        orderId,
        // quantity,
        // setQuantity,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
