const connection = require("../infrastructure/secure/connection");
const uploadFile = require("../files/uploadFiles");

class Pet {
  // CRUD

  // Create
  create(pet, res) {
    const query = "INSERT INTO Pets SET ?";

    uploadFile(pet.imagem, pet.nome, (err, newFolder) => {
      if (err) {
        res.status(400).json({ err });
      } else {
        const newPet = { nome: pet.nome, imagem: newFolder };

        connection.query(query, newPet, (err) => {
          err
            ? (console.log(err), res.status(400).json(err))
            : res.status(200).json(newPet);
        });
      }
    });
  }
}

module.exports = new Pet();
