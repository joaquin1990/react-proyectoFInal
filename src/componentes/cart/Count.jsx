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
    <div className="d-flex align-items-center justify-content-center">
      {" "}
      <button
        className="btn btn-sm m-2 btn-secondary"
        onClick={() => {
          decrease();
        }}
      >
        -
      </button>
      <p className="mt-1"> {item.quantity}</p>
      <button
        className="btn btn-sm m-2 btn-secondary"
        onClick={() => {
          increase();
        }}
      >
        +
      </button>
    </div>
  );
}
