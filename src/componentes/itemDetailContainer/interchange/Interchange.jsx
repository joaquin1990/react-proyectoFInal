import React, { useState } from "react";
import ButtonCount from "./buttonCount/ButtonCount";
import InputCount from "./inputCount/InputCount";

export default function Interchange({ item, quantity }) {
  const [inputType, setInputType] = useState("button");

  const handleInter = () => {
    setInputType("input");
  };
  return (
    <div>
      {inputType === "button" ? (
        <ButtonCount
          quantity={quantity}
          item={item}
          handleInter={handleInter}
        />
      ) : (
        <InputCount />
      )}
    </div>
  );
}
