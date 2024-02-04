# Count of Money 💰

## Description
Count of Money est une application web de gestion de crypto-monnaies qui permet aux utilisateurs de suivre les prix, les tendances et d'autres informations importantes sur différentes crypto-monnaies. 

<img width="959" alt="Capture d'écran 2024-02-04 134245" src="https://github.com/ThomasBasquin/Count-of-money/assets/60144822/aa9767eb-630e-4d36-8a15-e9cb06452b09">

## Caractéristiques
- Suivi en temps réel des prix des crypto-monnaies.
- Historique des prix et analyse des tendances.
- Connexion sécurisée et gestion de profil utilisateur.

## Technologies Utilisées
- Backend: Node.js, Express.js
- Base de données: MongoDB, Redis
- Frontend: React.js
- API: CoinGecko API pour les données de crypto-monnaies

## Installation pour le développement
Pour exécuter ce projet localement, suivez ces étapes :

1. Clonez le dépôt :
``git clone https://github.com/votreusername/Count-of-Money.git``

2. Lancer les bases de données :
``cd Count-of-Money``
``docker compose up --build``

3. Installez et lancer l'api :
``cd Count-of-Money/backend``
``npm install``
``npm run dev``

4. Installer et lancer le frontend :
``cd Count-of-Money/frontend``
``npm i``
``npm run dev``

## Contribution
Les contributions sont les bienvenues. Pour contribuer :
1. Forkez le projet.
2. Créez une nouvelle branche (`git checkout -b feature/AmazingFeature`).
3. Faites vos modifications.
4. Committez vos changements (`git commit -m 'Add some AmazingFeature'`).
5. Poussez vers la branche (`git push origin feature/AmazingFeature`).
6. Ouvrez une Pull Request.
