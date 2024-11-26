const express = require("express");
const { findPaths } = require("./pathFinder");
const { loadGraph } = require("./graph");
const { Readable } = require("stream");

const router = express.Router();
const graph = loadGraph();

router.post("/calculate", (req, res) => {
  const { start, end, fuelPrice, fuelEfficiency } = req.body;

  if (!start || !end || !fuelPrice || !fuelEfficiency) {
    return res.status(400).json({ message: "Parâmetros inválidos" });
  }

  const pathsGenerator = findPaths(start, end, graph, fuelPrice, fuelEfficiency);

  const readable = new Readable({
    read() {
      for (const path of pathsGenerator) {
        this.push(JSON.stringify({ caminho: path }) + "\n");
      }
      this.push(null); // End the stream
    }
  });

  res.setHeader('Content-Type', 'application/json');
  readable.pipe(res);
});

router.get("/capitals", (req, res) => {
  const capitalsList = Object.keys(graph);
  res.json(capitalsList);
});

module.exports = router;
