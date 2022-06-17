import React from "react";
import { Link } from "react-router-dom";

export default function NewButton() {
  return (
    <div className="mt-3">
      <Link to="/">
        <button className="btn btn-secondary">Ir a la Tienda</button>
      </Link>
    </div>
  );
}
