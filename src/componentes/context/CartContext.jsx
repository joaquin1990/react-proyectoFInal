import { createContext, useState } from "react";
import { useContext } from "react";
import { useOrderContext } from "./OrderContext";
import {
  // addDoc,
  collection,
  documentId,
  getDocs,
  getFirestore,
  query,
  where,
  // writeBatch,
} from "firebase/firestore";
// import { useOrderContext } from "./OrderContext";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

const CartContextProvider = ({ children }) => {
  // Estados y funciones
  const [count, setCount] = useState(0);
  const { cartList, setCartList } = useOrderContext();
  const db = getFirestore();

  async function checkStockInCartCount(item, quantity) {
    let itemSelected = {};
    const queryCollection = collection(db, "products");
    //Como hacer para buscar por id igual al id que le estamos pasando con el parametro.
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
    if (
      itemSelected.stock > 0 &&
      itemSelected.stock < item.quantity + quantity
    ) {
      alert(
        `Contamos unicamente con ${itemSelected.stock} unidad/es de este producto`
      );
      return false;
    }
    // When stock is higher than quantity selected, or, there is no stock:
    if (itemSelected.stock >= item.quantity + quantity) {
      return addToCart1({ ...item, quantity: item.quantity + quantity });
    } else
      alert(
        `Lamentablemente no contamos con mas stock de "${itemSelected.title}"`
      );
    return false;
  }

  async function addToCart1(item) {
    return setCartList(
      cartList.map((prod) =>
        prod.id === item.id ? { ...prod, quantity: item.quantity } : prod
      )
    );
  }

  return (
    <CartContext.Provider
      value={{
        checkStockInCartCount,
        count,
        setCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
