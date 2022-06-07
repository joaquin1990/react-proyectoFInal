import React from "react";
import { useCartContext } from "../../../context/CartContext";
import { useOrderContext } from "../../../context/OrderContext";

export default function ButtonCount({ handleInter, quantity, item }) {
  const { count, setCount } = useCartContext();
  const { addToCart } = useOrderContext();
  const { checkStock } = useOrderContext();

  const onAdd = (qty) => {
    addToCart({ ...item, quantity: qty });
  };

  return (
    <div>
      <button
        className="m-2 btn btn-secondary"
        onClick={() => {
          handleInter();
          setCount(count + 1);
          onAdd(quantity);
          checkStock(item.id, quantity);
        }}
      >
        Agregar al carrito
      </button>
    </div>
  );
}
