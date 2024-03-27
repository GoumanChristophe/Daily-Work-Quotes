const axios = require("axios");
const cheerio = require("cheerio");
const { writeFile, readFile } = require("fs/promises");

let array = [];

async function readFromFile(filename) {
  try {
    const data = await readFile(filename, "utf8");
    console.log(`Données correctement lues du fichier ${filename}`);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Erreur lors de la lecture du fichier ${filename}: ${error}`);
    return [];
  }
}

async function writeToFile(fileName, data) {
  try {
    await writeFile(fileName, data);
    console.log(`Les données ont été écrites dans ${fileName}`);
  } catch (error) {
    console.error(
      `Erreur lors de l'écriture dans le fichier : ${error.message}`
    );
  }
}

async function fetchAndParseURL(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    $(".content").each((index, element) => {
      let contentText = $(element).text().trim();
      let authorText = $(element).next(".author").text().trim();

      array.push({ content: contentText, author: authorText });
    });

    let existingData = await readFromFile("citation.json");
    let newData = array;

    newData.forEach((newItem) => {
      let duplicateItem = existingData.find(
        (existingItem) => existingItem.content === newItem.content
      );

      if (duplicateItem) {
        // Affiche un message avec les détails du doublon trouvé.
        console.log(
          `Cette citation existe déjà : ${duplicateItem.content} - ${duplicateItem.author}`
        );
      } else {
        // Si ce n'est pas un doublon, ajoute l'élément aux données existantes.
        existingData.push(newItem);
      }
    });

    const citationJson = JSON.stringify(existingData, null, 2);
    console.log(citationJson);
    await writeToFile("citation.json", citationJson);
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
}
for (let i = 1; i < 5; i++) {
  fetchAndParseURL(`https://www.abc-citations.com/themes/travail/page/${i}/`);
}
