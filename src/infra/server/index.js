const express = require("express");
const cors = require("cors");

const { PORT } = require("../environment");
const { registerRoutes } = require("./routes");

const messageServerStart = () => console.log(`Server Started in port ${PORT} 🚀`)

const run = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  registerRoutes(app);
  app.listen(PORT, messageServerStart);
}

module.exports = { run };