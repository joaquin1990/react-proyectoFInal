import React from "react";
import ItemCount from "../itemCount/ItemCount";
import "./itemDetail.css";

export default function ItemDetail({ item }) {
  return (
    <div className="">
      <div className="card p-3 detailCard my-5 m-auto ">
        <div className="card-body d-flex row">
          <h4 className="card-title">Detalles del Producto</h4>
          <h5 className="card-title">{item.title}</h5>
          <img className="item__img container" src={item.image} alt="" />
          <p className="card-subtitle mb-2 text-muted">$ {item.price}</p>
        </div>
        <ItemCount item={item} initial={item.initial} />
      </div>
    </div>
  );
}
