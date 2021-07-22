const customExpress = require("./config/customExpress");
const connection = require("./infrastructure/secure/connection");
const Tabelas = require("./infrastructure/tabelas");

connection.connect((err) => {
  err ? console.log(err) : console.log("Conectado com sucesso!");
  Tabelas.init(connection);
  const app = customExpress();
  app.listen(3000, () => console.log("servidor rodando na porta 3000"));
});
