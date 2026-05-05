const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const optimizeRoutes = require("./routes/optimize");
const { notFoundHandler } = require("./middleware/notFoundHandler");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Diet Optimization API sudah aktif. Silakan gunakan endpoint /v1/optimize untuk mendapatkan rekomendasi menu.",
    data: {}
  });
});

app.use("/v1", optimizeRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
