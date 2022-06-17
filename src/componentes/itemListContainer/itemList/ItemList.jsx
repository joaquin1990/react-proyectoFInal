import Item from "../item/Item";

export default function ItemList({ items }) {
  return (
    <div>
      <div className="d-flex row container">
        {items.map((prod) => (
          <Item
            key={prod.id}
            id={prod.id}
            title={prod.title}
            price={prod.price}
            image={prod.image}
            stock={prod.stock}
          />
        ))}
      </div>
    </div>
  );
}
