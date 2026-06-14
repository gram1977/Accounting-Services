const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");

const app = express();

app.use(cors());
//Middleware: built-in middleware: Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use((req, res, next) => {
  const requestId = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  req.requestId = requestId;
  res.setHeader("X-Request-Id", requestId);
  console.log(`[TRACE ${requestId}] Incoming ${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    console.log(
      `[TRACE ${requestId}] Completed ${req.method} ${req.originalUrl} -> ${res.statusCode}`,
    );
  });

  next();
});

const morganFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(morgan(morganFormat));
app.use(routes);

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

// 404 handler (no route matched)
app.use((req, res) => {
  res
    .status(404)
    .json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Error handler (must have 4 args)
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.originalUrl}`);
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
