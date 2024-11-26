class PathFinderMiddleware {
  graph = null;

  constructor(graph) {
    this.graph = graph;
  }

  pathFinderValidationsMiddleware(req, res, next) {
    const { start, end, fuelPrice, fuelEfficiency } = req.body;

    if (!start || !end || !fuelPrice || !fuelEfficiency) {
      return res.status(400).json({
        error:
          "Parâmetros inválidos. Certifique-se de fornecer 'start', 'end', 'fuelPrice' e 'fuelEfficiency'.",
      });
    }

    if (fuelPrice <= 0 || fuelEfficiency <= 0) {
      return res.status(400).json({
        error:
          "Os valores de 'fuelPrice' e 'fuelEfficiency' devem ser maiores que zero.",
      });
    }

    if (!this.graph[start] || !this.graph[end]) {
      return res.status(400).json({
        error: `Os nós fornecidos (${start}, ${end}) não existem no grafo.`,
      });
    }

    next();
  }
}

module.exports = PathFinderMiddleware;
