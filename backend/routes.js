const express = require("express");
const { findPaths } = require("./pathFinder");
const { loadGraph } = require("./graph");

const router = express.Router();
const graph = loadGraph();

router.post("/calculate", (req, res) => {
  const { start, end, fuelPrice, fuelEfficiency } = req.body;

  if (!start || !end || !fuelPrice || !fuelEfficiency) {
    return res.status(400).json({ message: "Parâmetros inválidos" });
  }

  const paths = findPaths(start, end, graph, fuelPrice, fuelEfficiency);
  res.json({ caminhos: paths });
});

router.get("/capitals", (req, res) => {
  const capitalsList = Object.keys(graph);
  res.json(capitalsList);
});

module.exports = router;
