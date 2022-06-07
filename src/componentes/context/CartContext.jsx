import { createContext, useState } from "react";
import { useContext } from "react";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

const CartContextProvider = ({ children }) => {
  // Estados y funciones
  const [cartList, setCartList] = useState([]);
  const [count, setCount] = useState(0);

  //Funcion para validar de que el item ya esta en el carrito
  function isInCart(item) {
    let index = cartList.findIndex((prod) => prod.id === item.id);
    if (index > -1) {
      return true;
    } else return false;
  }

  function addToCart(item) {
    //La variable index es para ubicar la posicion del producto en el carrito.
    let index = cartList.findIndex((prod) => prod.id === item.id);
    //Añadiendo productos al carrito:
    if (isInCart(item)) {
      cartList[index].quantity = cartList[index].quantity + item.quantity;
    } else setCartList([...cartList, item]);
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

  function totalPrice() {
    const totPrice = cartList.reduce((acc, item) => {
      acc += item.price * item.quantity;
      return acc;
    }, 0);
    return totPrice;
  }

  function totalItems() {
    return cartList.reduce((acc, cur) => (acc += cur.quantity), 0);
  }
  totalItems();

  return (
    <CartContext.Provider
      value={{
        cartList,
        addToCart,
        emptyCart,
        removeItem,
        totalPrice,
        totalItems,
        count,
        setCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
