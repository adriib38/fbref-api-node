require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

const allowedOrigin = process.env.CORS_ORIGIN;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigin.indexOf(origin) === -1) {
        const msg = `El CORS no permite el origen: ${origin}`;
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET"],
  })
);


app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(logger("tiny"));

app.use(cookieParser());

app.use("/", require("./v1/routers/competitions"));

app.use("/status", async (req, res) => {
  return res.status(200).json({
    message: "Okay :)",
  });
});

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
