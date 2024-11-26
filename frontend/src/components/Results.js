import React from "react";
import { VariableSizeList as List } from "react-window";

// Define a function to calculate dynamic heights for each item based on the content.
const rowHeights = (result) => {
  return result.map((item) => {
    // Adjust the height dynamically based on the content, for example:
    return 200 + Math.round(Math.random() * 50); // Randomized height for demonstration
  });
};

const Results = ({ result }) => {
  // Get the row heights for all items
  const heights = rowHeights(result);

  // Get the size of each row based on its index
  const getItemSize = (index) => heights[index];

  // Row rendering component
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
        height={500} // Height of the visible area
        itemCount={result.length} // Total number of items
        itemSize={getItemSize} // Dynamic item height
        width="100%" // Full width of the container
      >
        {Row}
      </List>
    </div>
  );
};

export default Results;
