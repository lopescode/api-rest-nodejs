const fs = require("fs");
const path = require("path");

module.exports = (folder, filename, callbackCreatedImage) => {
  const validTypes = ["jpg", "png", "jpeg"];
  const type = path.extname(folder);
  const validType = validTypes.indexOf(type.substring(1)) !== -1;

  if (validType) {
    const newFolder = `../../server/src/assets/img/${filename}${type}`;
    
    fs.createReadStream(folder).pipe(
      fs
        .createWriteStream(newFolder)
        .on("finish", () => callbackCreatedImage(false, newFolder))
    );
  } else {
    const err = "Tipo inválido.";
    console.log("Erro! Tipo inválido.");
    callbackCreatedImage(err);
  }
};
