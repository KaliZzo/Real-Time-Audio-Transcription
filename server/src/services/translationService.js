const { Translate } = require("@google-cloud/translate").v2;
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "..", "..", "config.env") });

console.log(
  "GOOGLE_APPLICATION_CREDENTIALS:",
  process.env.GOOGLE_APPLICATION_CREDENTIALS
);

const credentialsPath = path.resolve(
  __dirname,
  "..",
  "..",
  process.env.GOOGLE_APPLICATION_CREDENTIALS
);
console.log("Resolved credentials path:", credentialsPath);

const translate = new Translate({
  keyFilename: credentialsPath,
});

async function translateText(text, targetLanguage) {
  try {
    const [translation] = await translate.translate(text, targetLanguage);
    // console.log(`Original text: ${text}`);
    // console.log(`Translated text: ${translation}`);
    return translation;
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
}

module.exports = { translateText };
