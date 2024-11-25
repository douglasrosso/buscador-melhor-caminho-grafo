import React from "react";

function CapitalsInput({ label, value, onChange, capitalsList, error }) {
  return (
    <div className="input-group">
      <label htmlFor={label}>{label}:</label>
      <input
        list={`${label}-list`}
        id={label}
        name={label}
        value={value}
        onChange={onChange}
        placeholder={`Escolha a ${label}`}
        className={error ? "input-error" : ""}
      />
      <datalist id={`${label}-list`}>
        {capitalsList.map((capital, index) => (
          <option key={index} value={capital} />
        ))}
      </datalist>
    </div>
  );
}

export default CapitalsInput;
