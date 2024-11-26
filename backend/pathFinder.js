function findPaths(start, end, graph, fuelPrice, fuelEfficiency) {
  if (!graph || typeof graph !== "object") {
    throw new Error("O grafo fornecido é inválido ou não existe.");
  }
  if (!graph[start] || !graph[end]) {
    throw new Error("Os nós inicial ou final não existem no grafo.");
  }
  if (fuelPrice <= 0 || fuelEfficiency <= 0) {
    throw new Error(
      "Preço do combustível e eficiência do veículo devem ser maiores que zero."
    );
  }

  const paths = [];
  const visited = new Set();

  function dfs(current, path, distance, fuelCost, tollCost) {
    console.log(
      `Explorando: ${current}, Distância: ${distance}, fuelEfficiency: ${fuelEfficiency}`
    );

    if (current === end) {
      if (fuelEfficiency > 0 && distance > 0) {
        const totalFuelCost = (distance / fuelEfficiency) * fuelPrice;
        console.log(`Custo de combustível: ${totalFuelCost}`);
        paths.push({
          path: path.join(" -> "),
          totalDistance: distance,
          totalFuelCost: totalFuelCost.toFixed(2),
          totalTollCost: tollCost,
          totalCost: (totalFuelCost + tollCost).toFixed(2),
        });
      } else {
        console.log("Dados inválidos para cálculo de combustível.");
      }
      return;
    }

    visited.add(current);

    if (!graph[current].neighbors) {
      throw new Error(`O nó ${current} não possui vizinhos válidos.`);
    }

    for (let neighbor in graph[current].neighbors) {
      if (!visited.has(neighbor)) {
        const newDistance = distance + graph[current].neighbors[neighbor];
        const newTollCost =
          (current !== start && current !== end ? graph[current].toll : 0) +
          tollCost;
        dfs(neighbor, [...path, neighbor], newDistance, fuelCost, newTollCost);
      }
    }

    visited.delete(current);
  }

  dfs(start, [start], 0, 0, 0);

  return paths.sort(
    (a, b) => parseFloat(a.totalCost) - parseFloat(b.totalCost)
  );
}

module.exports = { findPaths };
