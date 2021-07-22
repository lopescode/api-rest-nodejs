const moment = require("moment");
const connection = require("../infrastructure/security/connection");

class Atendimento {
  // CRUD

  // Create
  create(atendimento, res) {
    const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );
    const dataValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteValido = atendimento.cliente.length >= 5;

    const validacoes = [
      {
        nome: "data",
        valido: dataValida,
        mensagem: "Data deve ser maior ou igual a data atual",
      },
      {
        nome: "cliente",
        valido: clienteValido,
        mensagem: "Cliente deve ter pelo menos cinco caracteres",
      },
    ];

    const erros = validacoes.filter((field) => !field.valido);
    const existemErros = erros.length;

    if (existemErros) {
      res.status(400).json(erros);
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data };

      const query = "INSERT INTO Atendimentos SET ?";

      connection.query(query, atendimentoDatado, (err, result) => {
        err ? res.status(400).json(err) : res.status(201).json(atendimento);
      });
    }
  }

  // Read
  read(res) {
    const query = "SELECT * FROM Atendimentos";

    connection.query(query, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  }

  readById(id, res) {
    const query = `SELECT * FROM Atendimentos WHERE id=${id}`;

    connection.query(query, (err, result) => {
      const atendimento = result[0];
      err ? res.status(400).json(err) : res.status(200).json(atendimento);
    });
  }

  // Update
  update(id, fields, res) {
    if (fields.data) {
      fields.data = moment(fields.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:MM:SS"
      );
    }
    const query = "UPDATE Atendimentos SET ? WHERE id=?";

    connection.query(query, [fields, id], (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json({ ...fields, id });
    });
  }

  // Delete
  delete(id, res) {
    const query = "DELETE FROM Atendimentos WHERE id=?";

    connection.query(query, id, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json({ id });
    });
  }
}

module.exports = new Atendimento();
