import { useCartContext } from "../context/CartContext";

export default function Count({ item }) {
  const { checkStockInCartCount } = useCartContext();

  function increase() {
    const newQuantity = 1;
    checkStockInCartCount(item, newQuantity);
  }

  function decrease() {
    const newQuantity = -1;
    checkStockInCartCount(item, newQuantity);
  }

  return (
    <div>
      {" "}
      <button
        className="btn btn-sm m-1 btn-secondary"
        onClick={() => {
          decrease();
        }}
      >
        -
      </button>
      {item.quantity}
      <button
        className="btn btn-sm m-1 btn-secondary"
        onClick={() => {
          increase();
        }}
      >
        +
      </button>
    </div>
  );
}
