const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

app.use(routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta ${PORT}, acesse pelo endereço http://localhost:${PORT}/`);
});
