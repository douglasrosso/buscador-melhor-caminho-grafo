const { findPaths } = require("./pathFinder");
const { loadGraph } = require("./graph");
const { Readable } = require("stream");
const express = require("express");

const router = express.Router();
const graph = loadGraph();

router.post("/calculate", (req, res) => {
  try {
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

    if (!graph[start] || !graph[end]) {
      return res.status(400).json({
        error: `Os nós fornecidos (${start}, ${end}) não existem no grafo.`,
      });
    }

    const pathsGenerator = findPaths(
      start,
      end,
      graph,
      fuelPrice,
      fuelEfficiency
    );

    const readable = new Readable({
      read() {
        for (const path of pathsGenerator) {
          this.push(JSON.stringify({ caminho: path }) + "\n");
        }
        this.push(null);
      },
    });

    res.setHeader("Content-Type", "application/json");
    readable.pipe(res);
  } catch (err) {
    console.error("Erro ao calcular caminhos:", err);
    res.status(500).json({
      error:
        "Ocorreu um erro interno ao calcular os caminhos. Tente novamente mais tarde.",
    });
  }
});

router.get("/capitals", (_, res) => {
  const capitalsList = Object.keys(graph);
  res.json(capitalsList);
});

module.exports = router;

/*
  TODO - Implement the error handling in the ui side
  if (!paths || paths.length === 0) {
    return res.status(404).json({
      error: "Nenhum caminho encontrado entre os nós fornecidos.",
    });
  }
*/
