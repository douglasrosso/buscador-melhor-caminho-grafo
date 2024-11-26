import React, { useState } from "react";

function FuelInput({ label, value, onChange, placeholder, error }) {
  const [errorMinValue, setErrorMinValue] = useState("");

  const handleBlur = () => {
    if (parseFloat(value) < 0.1 || isNaN(value)) {
      setErrorMinValue(
        "O valor deve ser maior que 0 e não pode conter caracteres especiais."
      );
    } else {
      setErrorMinValue("");
    }
  };

  return (
    <div className="input-group">
      <label htmlFor={label}>{label}:</label>
      <input
        type="number"
        className={error || errorMinValue ? "input-error" : ""}
        id={label}
        value={value}
        min={0}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={handleBlur}
      />
      {errorMinValue && <div className="error-message">{errorMinValue}</div>}
    </div>
  );
}

export default FuelInput;
