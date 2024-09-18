require("dotenv").config({ encoding: "utf8" });
const fs = require("fs");
const path = require("path");
const pathToFiles = path.join(__dirname, "../../data");
const Tesseract = require("tesseract.js");
const imageFilePath = path.join(__dirname, "../../data/Test.jpg");
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function readFiles(text) {
  //console.log(text);
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "assistant",
        content:
          "Descifra el texto, obtén la fecha de emisión, destinatario y numero de guía y devuélveme el siguiente nombre (GUÍA [numero de guía solo 4 últimos dígitos] [nombre del destinatario])",
      },
      { role: "user", content: text },
    ],
  });
  return completion.choices[0].message.content;
}

async function extractTextFromImage() {
  const textRecognize = await Tesseract.recognize(imageFilePath, "spa", {
    logger: (m) => console.log(m),
  }).then(({ data: { text } }) => {
    return text;
  });
  return textRecognize;
}

module.exports = {
  readFiles,
  extractTextFromImage,
};
