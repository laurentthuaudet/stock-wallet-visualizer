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

### 1. Gestion des Actions (Stocks)
-   **Ajouter/Modifier une action** :
    -   Nom de l'entreprise.
    -   Thèse d'investissement (explication simple).
    -   Pourcentage cible dans le portefeuille.
    -   Prix moyen d'achat (PRU).
    -   Prix actuel du marché.
    -   Classifications (Secteur, Type, etc.).
-   **Visualisation** :
    -   Graphique **Camembert** pour la répartition pondérée des actions.
    -   Graphique **Bâton** pour l'exposition par classification.
-   **Liste des actions** : Consultation et suppression des lignes.

### 2. Gestion des Options
-   **Suivi de stratégies** :
    -   Types : CALL / PUT.
    -   Direction : Achat (Long) / Vente (Short).
-   **Détails du contrat** :
    -   Sous-jacent, Strike, Prime, Date d'expiration.
-   **Analyse Graphique** :
    -   Visualisation interactive du **Payoff (P&L)** à l'échéance.
    -   Projection du **profit/perte** en fonction du prix du sous-jacent.
    -   Comparaison avec le prix actuel du marché.
-   **Organisation** :
    -   Séparation claire entre positions Achat (Long) et Vente (Short).

## Technologies

-   **Frontend** : React, Vite, Chart.js, TailwindCSS
-   **Backend** : Node.js, Express, Mongoose
-   **Base de données** : MongoDB
