import { useOrderContext } from "../context/OrderContext";

export default function Count({ item }) {
  const { checkStock } = useOrderContext;
  //   const [quantity, setQuantity] = useState(quantity);

  function increase() {
    const newQuantity = item.quantity + 1;
    checkStock(item, newQuantity);
  }

  function decrease() {
    const newQuantity = item.quantity - 1;
    checkStock(item, newQuantity);
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
