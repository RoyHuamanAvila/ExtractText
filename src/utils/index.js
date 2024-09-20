require("dotenv").config({ encoding: "utf8" });
const fs = require("fs");
const path = require("path");
const Tesseract = require("tesseract.js");
const OpenAI = require("openai");

const pathToFiles = path.join(__dirname, "../../data");
const imageFilePath = path.join(__dirname, "../../data/Test.jpg");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const GPT_PROMPT = "Descifra el texto, obtén la fecha de emisión, destinatario y numero de guía y devuélveme el siguiente nombre (GUÍA [numero de guía solo 4 últimos dígitos] [nombre del destinatario])";

async function readFiles(text) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "assistant", content: GPT_PROMPT },
      { role: "user", content: text },
    ],
  });
  return completion.choices[0].message.content;
}

async function extractTextFromImage() {
  const { data: { text } } = await Tesseract.recognize(imageFilePath, "spa", {
    logger: (m) => console.log(m),
  });
  return text;
}

function renameFile(filePath, newName) {
  const newPath = path.join(path.dirname(filePath), newName);
  fs.renameSync(filePath, newPath);
}

async function extractTextFromImages() {
  const files = fs.readdirSync(pathToFiles);
  const textPromises = files.map((file) => {
    const filePath = path.join(pathToFiles, file);
    return Tesseract.recognize(filePath, "spa", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => [text, filePath]);
  });

  return Promise.all(textPromises);
}

async function analiceText() {
  const textArray = await extractTextFromImages();
  const completionPromises = textArray.map(async ([text, filePath]) => {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "assistant", content: GPT_PROMPT },
        { role: "user", content: text },
      ],
    });
    return [completion.choices[0].message.content, filePath];
  });

  const completionArray = await Promise.all(completionPromises);
  completionArray.forEach(([newName, filePath]) => renameFile(filePath, newName));

  return completionArray.map(([newName]) => newName);
}

module.exports = {
  readFiles,
  extractTextFromImage,
  extractTextFromImages,
  analiceText,
};
