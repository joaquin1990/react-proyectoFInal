import "./item.css";
import { Link } from "react-router-dom";

export default function Item({ title, image, id }) {
  return (
    <div className="m-auto col col-xl-3 col-lg-4 col-md-6 col-sm-8 col-12 p-3">
      <h5>{title}</h5>
      <img className="item__img" src={image} alt="" />
      <Link to={`/detail/${id}`}>
        <button className="btn btn-secondary w-70">
          Detalles del producto
        </button>
      </Link>
    </div>
  );
}
