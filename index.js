const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const app = express();

app.use(formidable());
app.use(cors());

require("dotenv").config();

const comicsRoutes = require("./routes/comics");
const charactersRoutes = require("./routes/characters");
app.use(comicsRoutes);
app.use(charactersRoutes);

app.get("/", (req, res) => {
  res.json("Bienvenue sur l'API de Vinted");
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
