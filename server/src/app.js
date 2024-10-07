const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const transcriptionRoutes = require("./routes/transcriptionRoutes");

dotenv.config({ path: "./../config.env" });

const app = express();
const PORT = process.env.PORT || 3008;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Transcription and Translation API",
      version: "1.0.0",
      description: "API for live transcription and translation",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"], // путь к файлам с маршрутами
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/transcription", transcriptionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
