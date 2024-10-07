const express = require("express");
const {
  startLiveTranscriptionAndTranslation,
} = require("../services/deepgramService");
const router = express.Router();

/**
 * @swagger
 * /api/transcription/start:
 *   post:
 *     summary: Start live transcription and translation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - audioUrl
 *               - targetLanguage
 *             properties:
 *               audioUrl:
 *                 type: string
 *               targetLanguage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transcription and translation started
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
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
      console.log("Transcript:", transcript);
      console.log("Translation:", translation);
    },
    targetLanguage
  );

  res.json({ message: "Transcription and translation started" });
});

module.exports = router;
