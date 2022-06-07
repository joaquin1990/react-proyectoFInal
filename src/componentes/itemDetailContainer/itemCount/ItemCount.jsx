import React from "react";
import InterChange from "../interchange/Interchange";
import { useState } from "react";
import "./ItemCount.css";

export default function ItemCount({ initial, item }) {
  const [quantity, setQuantity] = useState(initial);

  function increase() {
    setQuantity(quantity + 1);
  }

  function decrease() {
    if (quantity > initial) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <div>
      <div className="counter">
        <div className="d-flex-column">
          <button className="btn btn-secondary" onClick={decrease}>
            -
          </button>
          <span className="p-3 itemCount__quantity">{quantity}</span>
          <button className="btn btn-secondary" onClick={increase}>
            +
          </button>
        </div>
      </div>
      <InterChange item={item} quantity={quantity} />
    </div>
  );
}
