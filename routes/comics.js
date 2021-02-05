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
      let comicsData = [[], { count: response.data.count }];
      let portraitSize = "/portrait_xlarge";
      for (i = 0; i < response.data.results.length; i++) {
        let dataSheet = {
          picture: `${response.data.results[i].thumbnail.path}${portraitSize}.${response.data.results[i].thumbnail.extension}`,
          title: response.data.results[i].title,
          description: response.data.results[i].description,
          id: response.data.results[i]._id,
        };
        Object.keys(dataSheet).forEach(
          (key) => dataSheet[key] === null && delete dataSheet[key]
        );
        comicsData[0].push(dataSheet);
        // console.log(response.data.results[i].thumbnail.path === regexpic);
      }

      console.log(comicsData); // Affichera la réponse du serveur
      res.json(comicsData);
    })
    .catch((error) => {
      console.log(error); // Affichera d'éventuelles erreurs, notamment en cas de problème de connexion Internet.
    });
});

module.exports = router;
