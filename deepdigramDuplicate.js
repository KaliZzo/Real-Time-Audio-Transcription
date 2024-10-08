const { createClient, LiveTranscriptionEvents } = require("@deepgram/sdk");
const fetch = require("cross-fetch");
const dotenv = require("dotenv");
const { translateText } = require("./translationService");

dotenv.config({ path: "./../../config.env" });

function startLiveTranscriptionAndTranslation(
  url,
  onTranscriptAndTranslation,
  targetLanguage
) {
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

  const connection = deepgram.listen.live({
    model: "nova-2",
    language: "en-US",
    smart_format: true,
  });

  connection.on(LiveTranscriptionEvents.Open, () => {
    console.log("Connection opened.");

    connection.on(LiveTranscriptionEvents.Close, () => {
      console.log("Connection closed.");
    });

    connection.on(LiveTranscriptionEvents.Transcript, async (data) => {
      const transcript = data.channel.alternatives[0].transcript;
      try {
        const translation = await translateText(transcript, targetLanguage);
        onTranscriptAndTranslation(transcript, translation);
      } catch (error) {
        console.error("Error in translation:", error);
        onTranscriptAndTranslation(transcript, "Translation error");
      }
    });

    connection.on(LiveTranscriptionEvents.Error, (err) => {
      console.error("Deepgram API error:", err);
    });

    fetch(url)
      .then((r) => r.body)
      .then((res) => {
        res.on("readable", () => {
          connection.send(res.read());
        });
      })
      .catch((error) => {
        console.error("Error fetching audio stream:", error);
      });
  });

  return connection;
}

module.exports = { startLiveTranscriptionAndTranslation };
