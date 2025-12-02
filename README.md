# Application de Visualisation de Portefeuille Boursier

Cette application permet de gérer et visualiser un portefeuille boursier avec une répartition par action et par classification.

## Prérequis

- Docker et Docker Compose installés.

## Installation et Lancement

1.  Ouvrez un terminal dans le dossier racine du projet.
2.  Lancez la commande suivante pour construire et démarrer les conteneurs :

    ```bash
    docker-compose up --build
    ```

3.  Une fois les conteneurs démarrés, accédez à l'application via votre navigateur :

    -   **Frontend (Application Web)** : [http://localhost:5173](http://localhost:5173)
    -   **Backend (API)** : [http://localhost:5000](http://localhost:5000)

## Fonctionnalités

-   **Ajouter une action** : Nom, Thèse (pour enfant de 10 ans), Pourcentage, Classifications.
-   **Visualisation** :
    -   Graphique Camembert pour le poids des actions.
    -   Graphique Bâton pour le poids des classifications.
-   **Liste des actions** : Voir et supprimer les actions existantes.

## Technologies

-   **Frontend** : React, Vite, Chart.js
-   **Backend** : Node.js, Express, Mongoose
-   **Base de données** : MongoDB
