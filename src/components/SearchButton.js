import React from "react";

function SearchButton({ onClick, loading }) {
  return (
    <button
      className="search-button"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "Carregando..." : "Buscar Caminho"}
    </button>
  );
}

export default SearchButton;
