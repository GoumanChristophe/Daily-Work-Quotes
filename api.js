const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();

const fs = require("fs").promises;

app.set("views", "./public");
app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use("/src", express.static("src"));
app.use("/img", express.static("img"));

const port = process.env.PORT || 4000;

app.get("/json", async (req, res) => {
  try {
    // Lecture asynchrone du contenu du fichier
    const result = await fs.readFile("./src/citation.json", "utf8");

    // Parsing du contenu JSON
    const data = JSON.parse(result);

    // Envoi du contenu JSON au client
    res.json(data);
  } catch (error) {
    // Gestion des erreurs et envoi d'une réponse d'erreur
    console.error(error);

    res
      .status(500)
      .send("Une erreur est survenue lors de la lecture du fichier JSON.");
  }
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
