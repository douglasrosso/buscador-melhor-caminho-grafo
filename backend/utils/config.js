const express = require("express");
const routes = require("../routes");
const path = require("path");
const cors = require("cors");

function useAppConfig(app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "..", "..", "build")));
  app.use(routes);
}

module.exports = { useAppConfig };
