const Atendimento = require("../models/atendimentos");

module.exports = (app) => {
  //CRUD

  // Create
  app.post("/atendimentos", (req, res) => {
    const atendimento = req.body;

    Atendimento.create(atendimento, res);
  });

  // Read
  app.get("/atendimentos", (req, res) => Atendimento.read(res));

  app.get("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Atendimento.readById(id, res);
  });

  // Update
  app.patch("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const fields = req.body;

    Atendimento.update(id, fields, res);
  });

  // Delete
  app.delete("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Atendimento.delete(id, res);
  });
};
