const { useAppConfig } = require("./utils/config");
const express = require("express");

const app = express();

useAppConfig(app);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(
    `Aplicação rodando na porta ${PORT}, acesse pelo endereço http://localhost:${PORT}/`
  );
});
