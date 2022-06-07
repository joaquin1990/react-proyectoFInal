import { useState } from "react";
import "./input.css";

function Input({ onChange, errorMessage, id, ...inputProps }) {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div>
      <input
        className="form-control mb-2 m-auto w-75 fs-5 text-center"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span className="inputSpan">{errorMessage}</span>
    </div>
  );
}

export default Input;
