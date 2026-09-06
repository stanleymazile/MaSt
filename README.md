# MazilePost Web Application

Application web d'actualités et d'articles connectée à **Firebase** (`mazilepost`) et hébergée sur **Firebase Hosting** (`mazilepost.web.app`).

## Fonctionnalités
- **React 18 + Vite + Tailwind CSS**
- **Firebase Firestore** : Gestion des inscriptions newsletter, formulaires de contact, articles sauvegardés (favoris) et compteurs de réactions/claps.
- **Firebase Authentication** : Connexion Google pour les utilisateurs.
- **Déploiement Continu (CI/CD)** : Intégration GitHub Actions préconfigurée vers Firebase Hosting.

---

## Déploiement automatique avec GitHub

### Étape 1 : Exporter le projet vers GitHub
1. Dans l'interface de Google AI Studio, cliquez sur le menu en haut à droite (ou l'icône paramètres).
2. Cliquez sur **Export to GitHub**.
3. Choisissez ou créez votre dépôt GitHub (ex. `mazilepost`).

---

### Étape 2 : Lier Firebase Hosting à GitHub en 1 commande
Firebase propose une commande officielle qui configure les secrets GitHub et l'accès sans rien faire manuellement :

```bash
# Dans votre projet cloné depuis GitHub :
firebase init hosting:github
```

Cette commande vous demandera :
1. D'autoriser l'accès à votre compte GitHub dans votre navigateur.
2. Le nom de votre dépôt GitHub (`stanleymazile/mazilepost` par exemple).
3. Elle configurera automatiquement le secret `FIREBASE_SERVICE_ACCOUNT_MAZILEPOST` et le fichier de déploiement.

Dès que vous ferez un `git push` sur la branche principale, votre site sera automatiquement construit et publié sur :
👉 **https://mazilepost.web.app** et **https://mazilepost.firebaseapp.com**

---

## Scripts disponibles

```bash
# Lancer le serveur de développement local
npm run dev

# Vérifier la validité TypeScript
npm run lint

# Compiler pour la production (génère dist/)
npm run build
```
