import "./item.css";
import { Link } from "react-router-dom";

export default function Item({ title, image, id, stock }) {
  return (
    <div className="m-auto col col-xl-3 col-lg-4 col-md-6 col-sm-8 col-12 p-3 ">
      <Link
        to={`/detail/${id}`}
        style={{ textDecoration: "none", color: "grey" }}
      >
        <div className="box_img">
          <h5>{title}</h5>
          {stock <= 0 ? <p className="stock_message">Sin Stock</p> : null}
          <img className="item_img" src={image} alt="" />
          <button className="btn btn-secondary w-70">
            Detalles del producto
          </button>
        </div>
      </Link>
    </div>
  );
}
