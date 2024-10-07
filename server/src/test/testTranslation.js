const { translateText } = require("../services/translationService");

async function testTranslation() {
  try {
    const result = await translateText("Hello, world!", "es");
    console.log("Test successful. Translation:", result);
  } catch (error) {
    console.error("Test failed:", error);
  }
}

testTranslation();
