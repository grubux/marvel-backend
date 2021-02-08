const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const app = express();

app.use(formidable());
app.use(cors());

require("dotenv").config();

const comicsIdRoutes = require("./routes/comicsid");
const comicsRoutes = require("./routes/comics");
const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);
app.use(comicsIdRoutes);
app.use(comicsRoutes);

app.get("/", (req, res) => {
  res.json("Welcome to the MARVEL API");
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
