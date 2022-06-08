import React from "react";
import { useOrderContext } from "../../../context/OrderContext";

export default function ButtonCount({ handleInter, quantity, item }) {
  const { checkStock, countOrder, setCountOrder } = useOrderContext();

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
