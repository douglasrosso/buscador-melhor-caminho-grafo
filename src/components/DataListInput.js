import React from "react";

function DataListInput({ label, value, onChange, capitalsList, error, name }) {
  return (
    <div className="input-group">
      <label htmlFor={label}>{label}:</label>
      <input
        list={`${label}-list`}
        id={label}
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
        placeholder={`Escolha a ${label}`}
        className={error ? "input-error" : ""}
      />
      <datalist id={`${label}-list`}>
        {capitalsList.map((capital, index) => (
          <option key={index} value={capital} />
        ))}
      </datalist>
      {error && <div className="error-message">Este campo é obrigatório.</div>}
    </div>
  );
}

export default DataListInput;
