import React from "react";
import { useCartContext } from "../../../context/CartContext";
import { useOrderContext } from "../../../context/OrderContext";

export default function ButtonCount({ handleInter, quantity, item }) {
  const { count, setCount } = useCartContext();
  // const { addToCart } = useOrderContext();
  const { checkStock, countOrder, setCountOrder } = useOrderContext();

  // const onAdd = (qty) => {
  //   addToCart({ ...item, quantity: qty });
  // };

  return (
    <div>
      <button
        className="m-2 btn btn-secondary"
        onClick={() => {
          handleInter();
          setCount(count + 1);
          setCountOrder(countOrder + 1);
          checkStock(item, quantity);
          // onAdd(quantity);
        }}
      >
        Agregar al carrito
      </button>
    </div>
  );
}
