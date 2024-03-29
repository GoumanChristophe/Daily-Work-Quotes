# Daily Work Quotes - Maintenant avec la fonctionnalité de publication automatique sur Twitter!

CCe projet est une application web qui affiche des citations inspirantes pour la journée de travail. Les citations sont obtenues grâce à un script de scraping (scrappeur.js), stockées dans un fichier JSON (citations.json), et mises à disposition via une API Express (api.js). De plus, la nouvelle fonctionnalité permet à l'application de publier automatiquement ces citations sur Twitter.

## Démarrage

Suivez ces instructions pour installer et exécuter le projet sur votre machine locale à des fins de développement et de test.

### Prérequis

- Node.js
- npm ou yarn

### Installation

 - Clonez le dépôt : 

git clone [URL du dépôt]
cd [nom du répertoire]

 - Installez les dépendances  :

npm install

Exécuter l'application : 

 - node api.js
 - Ouvrez votre navigateur et accédez à http://localhost:4000 pour voir l'application en action.

Script de Scraping
Pour exécuter le script de scraping et mettre à jour le fichier de citations :

  - node scrappeur.js

### Publier sur Twitter

La nouvelle fonctionnalité permet à l'application de poster automatiquement des citations sur Twitter :

Configurez les variables d'environnement pour inclure vos clés API Twitter.

Utilisez la route POST /tweet pour publier une citation sur Twitter.

### Construit avec : 

 - Express - Le framework web utilisé.
 - Axios - Utilisé pour les requêtes HTTP.
 - Cheerio - Utilisé pour le scraping.
 - Twitter API - Permet de publier des tweets automatiquement.

### Versioning

Nous utilisons SemVer pour le versionnage.

### Auteur

Gouman Christophe 

### Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

### Prochaine mise à jour

Restez à l'écoute pour des améliorations continues et de nouvelles fonctionnalités!
