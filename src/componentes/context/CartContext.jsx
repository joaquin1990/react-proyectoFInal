import { createContext, useState } from "react";
import { useContext } from "react";
import { useOrderContext } from "./OrderContext";
import {
  collection,
  documentId,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

const CartContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const { cartList, setCartList } = useOrderContext();
  const db = getFirestore();
  const MySwal = withReactContent(Swal);

  async function checkStockInCartCount(item, quantity) {
    let itemSelected = {};
    const queryCollection = collection(db, "products");
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
      MySwal.fire({
        icon: "error",
        title: "Mil disculpas!",
        text: `Contamos unicamente con ${itemSelected.stock} unidad/es de este producto`,
      });
      return false;
    }
    // When stock is higher than quantity selected, or, there is no stock:
    if (itemSelected.stock >= item.quantity + quantity) {
      return addToCart1({ ...item, quantity: item.quantity + quantity });
    } else
      MySwal.fire({
        icon: "error",
        title: "Mil disculpas!",
        text: `Lamentablemente no contamos con mas stock de "${itemSelected.title}"`,
      });
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
