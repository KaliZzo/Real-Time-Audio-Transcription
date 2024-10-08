const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");

// יצירת שרת WebSocket על פורט 3000
const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log("Received audio data");

    // שמירת ה-BLOB כקובץ אודיו במחשב
    const audioFilePath = path.join(__dirname, "audioStream.webm");
    fs.appendFile(audioFilePath, message, (err) => {
      if (err) {
        console.error("Error saving audio stream:", err);
      } else {
        console.log("Audio saved successfully to", audioFilePath);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:3000");
