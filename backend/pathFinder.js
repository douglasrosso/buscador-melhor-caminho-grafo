function* findPaths(start, end, graph, fuelPrice, fuelEfficiency) {
  const visited = new Set();

  function* dfs(current, path, distance, fuelCost, tollCost) {
    if (current === end) {
      if (fuelEfficiency > 0 && distance > 0) {
        const totalFuelCost = (distance / fuelEfficiency) * fuelPrice;
        yield {
          path: path.join(" -> "),
          totalDistance: distance,
          totalFuelCost: totalFuelCost.toFixed(2),
          totalTollCost: tollCost,
          totalCost: (totalFuelCost + tollCost).toFixed(2),
        };
      }
      return;
    }

    visited.add(current);

    for (let neighbor in graph[current].neighbors) {
      if (!visited.has(neighbor)) {
        const newDistance = distance + graph[current].neighbors[neighbor];
        const newTollCost =
          (current !== start && current !== end ? graph[current].toll : 0) +
          tollCost;
        yield* dfs(neighbor, [...path, neighbor], newDistance, fuelCost, newTollCost);
      }
    }

    visited.delete(current);
  }

  yield* dfs(start, [start], 0, 0, 0);
}

module.exports = { findPaths };