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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const OrderContext = createContext([]);
export const useOrderContext = () => useContext(OrderContext);

const OrderContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const [countOrder, setCountOrder] = useState(0);
  const [orderId, setOrderId] = useState(null);
  const db = getFirestore();
  const MySwal = withReactContent(Swal);

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
    // Function to Check if there is any stock, is going to be used after cart filter.
    const isThereAnyStock = () => {
      //To make sure the quantity is not higher than the stock when stock is not 0:
      if (itemSelected.stock > 0 && itemSelected.stock < quantity) {
        MySwal.fire({
          icon: "error",
          title: "Mil disculpas!",
          text: `Contamos unicamente con ${itemSelected.stock} unidad/es de este producto`,
        });
        return false;
      }
      // When stock is higher than quantity selected, or, there is no stock:
      if (itemSelected.stock >= quantity) {
        return addToCart({ ...item, quantity: quantity });
      } else
        MySwal.fire({
          icon: "error",
          title: "Mil disculpas!",
          text: `Lamentablemente no contamos con mas stock de "${itemSelected.title}"`,
        });
      return false;
    };
    const index = cartList.findIndex((prod) => prod.id === item.id);

    // Cart Filter:
    // Is There Any Stock Inclouding Cart Items?
    if (cartList[index]) {
      if (cartList[index].quantity + quantity <= itemSelected.stock) {
        // console.log(cartList[index].quantity < itemSelected.stock);
        return isThereAnyStock();
      } else
        MySwal.fire({
          icon: "error",
          text: `Contamos unicamente con ${itemSelected.stock} unidad/es de ${itemSelected.title}. Mil disculpas! `,
        });
    }
    if (index === -1) {
      return isThereAnyStock();
    }
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
    } else if (index >= 0) {
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

  // Function to remove items from the cart:
  function removeItem(item) {
    const newCart = cartList.filter((prod) => prod.id !== item.id);
    setCartList(newCart);
  }

  // Function to remove all items from the cart:
  function emptyCart() {
    setCartList([]);
  }
  // Function to update the quantity of item in the cart:
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
