import { useOrderContext } from "../context/OrderContext";

export default function Count({ item }) {
  const { checkStock, cartList } = useOrderContext();
  //   const [quantity, setQuantity] = useState(quantity);

  async function increase() {
    const index = cartList.findIndex((prod) => prod.id === item.id);
    console.log(index);
    const newQuantity = 1;
    await checkStock(item, newQuantity);
    console.log(cartList);
    // setCartList(
    //   cartList.map((prod) =>
    //     prod.id === item.id ? { ...prod, quantity: prod.quantity + 1 } : prod
    //   )
    // );
  }

  function decrease() {
    const index = cartList.findIndex((prod) => prod.id === item.id);
    console.log(index);
    const newQuantity = -1;
    checkStock(item, newQuantity);
    // setCartList(
    //   cartList.map((prod) =>
    //     prod.id === item.id ? { ...prod, quantity: prod.quantity - 1 } : prod
    //   )
    // );
  }

  return (
    <div>
      {" "}
      <button
        className="btn btn-sm m-1 btn-secondary"
        onClick={() => {
          //   checkStock(item, { ...item, quantity: item.quantity - 1 });
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
