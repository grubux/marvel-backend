const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(formidable());
app.use(cors());

require("dotenv").config();

router.get("/comics", async (req, res) => {
  await axios
    .get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.apiKey}`
    )
    .then((response) => {
      console.log(response.data); // Affichera la réponse du serveur
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error); // Affichera d'éventuelles erreurs, notamment en cas de problème de connexion Internet.
    });
});

module.exports = router;
