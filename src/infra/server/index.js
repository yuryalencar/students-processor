const cors = require("cors");
const express = require("express");
const fileUpload = require('express-fileupload');

const { PORT } = require("../environment");
const { registerRoutes } = require("./routes");

const messageServerStart = () => console.log(`Server Started in port ${PORT} 🚀`)

const run = () => {
  const app = express();
  app.use(cors());
  app.use(fileUpload());
  app.use(express.json());
  registerRoutes(app);
  app.listen(PORT, messageServerStart);
}

module.exports = { run };