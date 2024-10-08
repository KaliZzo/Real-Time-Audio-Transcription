const express = require("express");
const {
  startLiveTranscriptionAndTranslation,
} = require("../services/deepgramService");
const router = express.Router();

router.post("/start", (req, res) => {
  const { audioUrl, targetLanguage } = req.body;

  if (!audioUrl || !targetLanguage) {
    return res
      .status(400)
      .json({ error: "Missing audioUrl or targetLanguage" });
  }

  const connection = startLiveTranscriptionAndTranslation(
    audioUrl,
    (transcript, translation) => {
      // כאן נשלח את התמלול והתרגום ללקוח
      // במקרה של תוסף כרום, נצטרך להשתמש ב-WebSocket או Server-Sent Events
      console.log("Transcript:", transcript);
      console.log("Translation:", translation);
    },
    targetLanguage
  );

  res.json({ message: "Transcription and translation started" });
});

module.exports = router;
