const fs = require("fs");
const path = require("path");

function loadGraph() {
  const filePath = path.join(__dirname, "capitais.json");
  const data = fs.readFileSync(filePath, "utf8");
  const capitalsData = JSON.parse(data);
  const graph = {};

  capitalsData.forEach((capitalData) => {
    const capitalName = Object.keys(capitalData)[0];
    graph[capitalName] = capitalData[capitalName];
  });

  return graph;
}

module.exports = { loadGraph };
