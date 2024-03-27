# Daily Work quotes 

Ce projet consiste en une application web qui affiche des citations. Les citations sont extraites d'un site web via un script de scraping (`scrappeur.js`), stockées dans un fichier JSON (`citation.json`), et servies par une API Express (`api.js`).

## Démarrage

Ces instructions vous permettront d'obtenir une copie du projet en cours d'exécution sur votre machine locale à des fins de développement et de test.

### Prérequis

- Node.js
- npm ou yarn

### Installation

Clonez le dépôt et installez les dépendances : 

git clone [URL du dépôt]
cd [nom du répertoire]
npm install

Exécuter l'application

 - Copy code
 - node api.js
 - Ouvrez votre navigateur et accédez à http://localhost:4000 pour voir l'application en action.

Script de Scraping
Pour exécuter le script de scraping et mettre à jour le fichier de citations :

 - Copy code
 - node scrappeur.js

### Construit avec : 
Express - Le framework web utilisé
axios - Pour les requêtes HTTP
cheerio - Utilisé pour le scraping

### Versioning
Nous utilisons SemVer pour le versionnage.

### Auteurs
Gouman Christophe 

### Licence
Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

### Prochaine mise à jour
La prochaine mise à jour inclura la fonctionnalité de post de tweet automatique, permettant à l'application de publier des tweets sans intervention manuelle.
