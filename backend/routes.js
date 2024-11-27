const PathFinderMiddleware = require("./middlewares/PathFinderMiddleware");
const GraphController = require("./controllers/GraphController");
const { loadGraph } = require("./utils/graph");
const express = require("express");
const path = require("path");

const router = express.Router();
const graph = loadGraph();

router.post("/calculate", (req, res, next) => {
  const pathFinderMiddleware = new PathFinderMiddleware(graph);
  pathFinderMiddleware.pathFinderValidationsMiddleware(req, res, next);
});

router.post("/calculate", (req, res) => {
  const graphController = new GraphController(graph);
  graphController.calculatePaths(req, res);
});

router.get("/capitals", (_, res) => {
  const capitalsList = Object.keys(graph);
  res.json(capitalsList);
});

router.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

module.exports = router;
