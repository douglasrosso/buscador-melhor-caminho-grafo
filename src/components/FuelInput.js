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
        onChange={(e) => {
          onChange(e);
          setErrorMinValue("");
        }}
        placeholder={placeholder}
        onBlur={handleBlur}
      />
      {errorMinValue && <div className="error-message">{errorMinValue}</div>}
      {error && !errorMinValue && (
        <div className="error-message">Este campo é obrigatório.</div>
      )}
    </div>
  );
}

export default FuelInput;
