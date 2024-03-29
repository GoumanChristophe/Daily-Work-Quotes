const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const twitter = require("twitter");
require("dotenv").config();
const fetch = require("node-fetch");
const cron = require("node-cron");

const fs = require("fs").promises;

app.set("views", "./public");
app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use("/src", express.static("src"));
app.use("/img", express.static("img"));
app.use(express.json());

var twit = new twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const port = process.env.PORT || 4000;

app.get("/random-quote", (req, res) => {
  RandomQuote()
    .then((randomItem) => res.json(randomItem))  // Utilise le résultat résolu de la promesse
    .catch((error) => {  // Gère les erreurs potentielles
      console.error("Erreur lors de la récupération des citations:", error);
      res.status(500).json({ error: "Erreur lors de la récupération des citations" });
    });
});


app.get("/json", async (req, res) => {
  try {
    const result = await fs.readFile("./src/citation.json", "utf8");

    const data = JSON.parse(result);

    res.json(data);
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .send("Une erreur est survenue lors de la lecture du fichier JSON.");
  }
});

app.get("/", (req, res) => {
  res.render("index");
});


function RandomQuote() {
  return fetch("http://localhost:4000/json")  
    .then((response) => response.json())
    .then((data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex];  
    });
}


function quoteToTweet() {
  fetch("http://localhost:4000/random-quote")
    .then(response => response.json())
    .then(data => {
      const { content, author } = data;
      const tweetText = `${content} - ${author}`;
      
      twit.post(
        "https://api.twitter.com/2/tweets",
        { text: tweetText },
        function (error, tweetResponse) {
          if (error) {
            console.error("Erreur lors de la publication du tweet :", error);
          } else {
            console.log("Tweet envoyé avec succès.");
          }
        }
      );
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des citations:", error);
    });
}

// Tâche pour récupérer la citation à 7h00
cron.schedule('0 7 * * *', () => {
  console.log('Récupération de la citation aléatoire à 7h00 chaque jour.');
  RandomQuote();
});

// Tâche pour envoyer le tweet à 7h30
cron.schedule('30 7 * * *', () => {
  console.log('Envoi du tweet à 7h30 chaque jour.');
  sendTweet();
});

// Poster le tweet


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
