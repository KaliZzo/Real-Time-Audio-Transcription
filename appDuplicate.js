const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const transcriptionRoutes = require("./routes/transcriptionRoutes");

dotenv.config({ path: "./../config.env" });

const app = express();
const PORT = process.env.PORT || 3008;

//Middleware
app.use(express.json());
app.use("/api/transcription", transcriptionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
});
