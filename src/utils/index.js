const fs = require("fs");
const path = require("path");
const pathToFiles = path.join(__dirname, "../../data");

async function readFiles() {
  await fs.readdir(pathToFiles, (err, files) => {
    console.log(files);
  });
}

module.exports = {
  readFiles,
};
