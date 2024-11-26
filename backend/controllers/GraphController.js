const PathFinderService = require("../services/PathFinderService");

class GraphController {
  graph = null;

  constructor(graph) {
    this.graph = graph;
  }

  async calculatePaths(req, res) {
    try {
      const pathFinderService = new PathFinderService({
        ...req.body,
        graph: this.graph,
      });
      
      const pathsGenerator = pathFinderService.findPaths();
      const readablePaths = pathFinderService.getPathsReadableStream.call(this, pathsGenerator);

      res.setHeader("Content-Type", "application/json");
      readablePaths.pipe(res);
    } catch (err) {
      console.error("Erro ao calcular caminhos:", err);
      res.status(500).json({
        error:
          "Ocorreu um erro interno ao calcular os caminhos. Tente novamente mais tarde.",
      });
    }
  }
}

module.exports = GraphController;
