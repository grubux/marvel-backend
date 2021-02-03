const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
const { count } = require("../../../vinted/express-vinted-master/models/User");
const app = express();

app.use(formidable());
app.use(cors());

require("dotenv").config();

router.get("/characters", async (req, res) => {
  let itemsSkipped = (req.query.page - 1) * 100;
  let characterName = req.query.name;

  await axios
    .get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.apiKey}&limit=100&skip=${itemsSkipped}&name=${characterName}`
    )
    .then((response) => {
      let dataThumbnails = [];
      let portraitSize = "/portrait_xlarge";

      for (i = 0; i < response.data.results.length; i++) {
        let dataSheet = {
          picture: `${response.data.results[i].thumbnail.path}${portraitSize}.${response.data.results[i].thumbnail.extension}`,
          name: response.data.results[i].name,
          description: response.data.results[i].description,
        };
        dataThumbnails.push(dataSheet);
      }

      console.log(dataThumbnails);

      res.json(response.data);
    })
    .catch((error) => {
      console.log(error); // Affichera d'éventuelles erreurs, notamment en cas de problème de connexion Internet.
    });
});

module.exports = router;
