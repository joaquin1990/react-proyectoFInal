import React from "react";
import { useOrderContext } from "../../../context/OrderContext";

export default function ButtonCount({ handleInter, quantity, item }) {
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
          checkStock(item, quantity);
          setCountOrder(countOrder + 1);
        }}
      >
        Agregar al carrito
      </button>
    </div>
  );
}
