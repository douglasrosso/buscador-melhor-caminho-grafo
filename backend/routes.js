const express = require("express");
const { findPaths } = require("./pathFinder");
const { loadGraph } = require("./graph");

const router = express.Router();
const graph = loadGraph();

router.post("/calculate", (req, res) => {
  const { start, end, fuelPrice, fuelEfficiency } = req.body;

  if (!start || !end || !fuelPrice || !fuelEfficiency) {
    return res.status(400).json({
      error:
        "Parâmetros inválidos. Certifique-se de fornecer 'start', 'end', 'fuelPrice' e 'fuelEfficiency'.",
    });
  }

  if (!graph[start] || !graph[end]) {
    return res.status(400).json({
      error: `Os nós fornecidos (${start}, ${end}) não existem no grafo.`,
    });
  }

  if (fuelPrice <= 0 || fuelEfficiency <= 0) {
    return res.status(400).json({
      error:
        "Os valores de 'fuelPrice' e 'fuelEfficiency' devem ser maiores que zero.",
    });
  }

  try {
    // Tentativa de encontrar os caminhos
    const paths = findPaths(start, end, graph, fuelPrice, fuelEfficiency);

    if (!paths || paths.length === 0) {
      return res.status(404).json({
        error: "Nenhum caminho encontrado entre os nós fornecidos.",
      });
    }

    res.status(200).json({ caminhos: paths });
  } catch (err) {
    console.error("Erro ao calcular caminhos:", err);
    res.status(500).json({
      error:
        "Ocorreu um erro interno ao calcular os caminhos. Tente novamente mais tarde.",
    });
  }
});

router.get("/capitals", (req, res) => {
  const capitalsList = Object.keys(graph);
  res.json(capitalsList);
});

module.exports = router;
