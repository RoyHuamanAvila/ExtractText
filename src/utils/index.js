const fs = require("fs");
const path = require("path");
const pathToFiles = path.join(__dirname, "../../data");
const Tesseract = require("tesseract.js");
const imageFilePath = path.join(__dirname, "../../data/Test.jpg");

async function readFiles() {
  await fs.readdir(pathToFiles, (err, files) => {
    console.log(files);
  });
}

async function extractTextFromImage() {
  await Tesseract.recognize(imageFilePath, "spa", {
    logger: (m) => console.log(m),
  }).then(({ data: { text } }) => {
    console.log(text);
  });
}

module.exports = {
  readFiles,
  extractTextFromImage,
};
