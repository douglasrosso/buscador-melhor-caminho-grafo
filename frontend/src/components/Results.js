import React from "react";

function Results({ result }) {
  return (
    <div className="result">
      <h2>Resultados</h2>
      {result.map((item, index) => (
        <div key={index}>
          {index === 0 ? (
            <h3>Caminho mais econômico</h3>
          ) : (
            <h3>Caminho {index + 1}</h3>
          )}
          <p>
            <strong>Caminho:</strong> {item.path}
          </p>
          <p>
            <strong>Gasto com combustível:</strong> R${item.totalFuelCost}
          </p>
          <p>
            <strong>Gasto com pedágio:</strong> R${item.totalTollCost}
          </p>
          <p>
            <strong>Distância total:</strong> {item.totalDistance} km
          </p>
          <p>
            <strong>Custo total:</strong> R${item.totalCost}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Results;
