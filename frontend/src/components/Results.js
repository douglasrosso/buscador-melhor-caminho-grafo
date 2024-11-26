import React from "react";
import { VariableSizeList as List } from "react-window";

const rowHeights = (result) => {
  return result.map((item) => {
    return 200 + Math.round(Math.random() * 50);
  });
};

const Results = ({ result }) => {
  const heights = rowHeights(result);

  const getItemSize = (index) => heights[index];

  const Row = ({ index, style }) => {
    const item = result[index];
    return (
      <div style={style} key={index}>
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
    );
  };

  return (
    <div className="result">
      <h2>Resultados</h2>
      <List
        height={500}
        itemCount={result.length}
        itemSize={getItemSize}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
};

export default Results;
