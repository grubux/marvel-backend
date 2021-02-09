const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(formidable());
app.use(cors());

require("dotenv").config();

router.get("/comics/:characterid", async (req, res) => {
  const characteridparam = req.params.characterid;
  await axios
    .get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characteridparam}?apiKey=${process.env.apiKey}`
    )
    .then((response) => {
      let portraitSizeCharacter = "/portrait_uncanny";
      let portraitSizeComic = "/standard_large";

      let characterComicData = [
        {
          mainpicture: `${response.data.thumbnail.path}${portraitSizeCharacter}.${response.data.thumbnail.extension}`,
          name: response.data.name,
          description: response.data.description,
          id: response.data._id,
        },
        [],
      ];
      for (i = 0; i < response.data.comics.length; i++) {
        let comicsSheet = {
          comicPicture: `${response.data.comics[i].thumbnail.path}${portraitSizeComic}.${response.data.comics[i].thumbnail.extension}`,
          comicTitle: response.data.comics[i].title,
          comicDescription: response.data.comics[i].description,
          comicId: response.data.comics[i]._id,
        };
        characterComicData[1].push(comicsSheet);
      }
      // Object.keys(dataSheet).forEach(
      //   (key) => dataSheet[key] === null && delete dataSheet[key]
      // );
      // console.log(response.data.results[i].thumbnail.path === regexpic);

      //   console.log(comicsData); // Affichera la réponse du serveur
      console.log(characterComicData);
      res.json(characterComicData);
    })
    .catch((error) => {
      console.log(error); // Affichera d'éventuelles erreurs, notamment en cas de problème de connexion Internet.
    });
});

module.exports = router;
