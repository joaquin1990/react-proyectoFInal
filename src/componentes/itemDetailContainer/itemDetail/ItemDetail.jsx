import React from "react";
import ItemCount from "../itemCount/ItemCount";

export default function ItemDetail({ item }) {
  return (
    <div>
      <div className="card p-3 my-5 w-25 m-auto ">
        <div className="card-body d-flex row">
          <h4 className="card-title">Detalles del Producto</h4>
          <h5 className="card-title">{item.title}</h5>
          <img className="w-75 container" src={item.image} alt="" />
          <p className="card-subtitle mb-2 fs-3 font-weight-bold">
            $ {item.price}
          </p>
        </div>
        <ItemCount item={item} initial={item.initial} />
      </div>
    </div>
  );
}
