require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

const allowedOrigin = process.env.CORS_ORIGIN;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigin === origin) {
        return callback(null, true);
      }
      const msg = `El CORS no permite el origen: ${origin}`;
      return callback(new Error(msg), false);
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.options("*", cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("tiny"));
app.use(cookieParser());

// Rutas principales
app.use("/c", require("./v1/routers/competitions"));
app.use("/t", require("./v1/routers/teams"));
app.use("/g", require("./v1/routers/games"));

// Ruta de estado
app.use("/status", async (req, res) => {
  return res.status(200).json({
    message: "Okay :)",
  });
});

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({
    error: "Endpoint not Found",
    endpoint: req.originalUrl,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

module.exports = app;
