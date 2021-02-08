const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(formidable());
app.use(cors());

require("dotenv").config();

router.get("/characters", async (req, res) => {
  let itemsSkipped = (req.query.page - 1) * 100;
  let characterName = req.query.name;

  await axios
    .get(
      characterName
        ? `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.apiKey}&limit=100&skip=${itemsSkipped}&name=${characterName}`
        : `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.apiKey}&limit=100&skip=${itemsSkipped}`
    )
    .then((response) => {
      let charactersData = [[], { count: response.data.count }];
      let portraitSize = "/portrait_xlarge";
      // Essayer de faire une regex pour ne pas afficher une image si le path contient image_not_available
      // const regexpic = new RegExp("(.*)");

      // création de l'objet à envoyer au front, dataSheet
      for (i = 0; i < response.data.results.length; i++) {
        let dataSheet = {
          picture: `${response.data.results[i].thumbnail.path}${portraitSize}.${response.data.results[i].thumbnail.extension}`,
          name: response.data.results[i].name,
          description: response.data.results[i].description,
          comics: response.data.results[i].comics,
          id: response.data.results[i]._id,
        };
        charactersData[0].push(dataSheet);
        // console.log(response.data.results[i].thumbnail.path === regexpic);
      }
      // console.log(charactersData);
      console.log(charactersData[0]);
      console.log(charactersData[1]);

      // console.log(charactersData);
      res.json(charactersData);
    })
    .catch((error) => {
      console.log(error); // Affichera d'éventuelles erreurs, notamment en cas de problème de connexion Internet.
    });
});

module.exports = router;
