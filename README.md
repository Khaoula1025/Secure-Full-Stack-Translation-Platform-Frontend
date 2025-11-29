# TalAIt Translation Platform - Frontend

## 📋 Vue d'ensemble

Application frontend Next.js pour la plateforme de traduction sécurisée de TalAIt. Cette interface permet aux employés authentifiés de traduire des textes entre le français et l'anglais en utilisant l'API Hugging Face via le backend FastAPI.

## 🎯 Fonctionnalités

- **Authentification sécurisée** : Inscription et connexion avec JWT stocké en cookies HttpOnly
- **Traduction bidirectionnelle** : FR → EN et EN → FR
- **Interface intuitive** : Formulaires simples et réactifs
- **Gestion d'état** : Loading, erreurs et succès
- **Sécurité** : Cookies HttpOnly, CSRF protection, requêtes protégées par JWT

## ✅ Prérequis

Avant de commencer, assurez-vous d'avoir :

- **Node.js** v18.x ou supérieur
- **npm** ou **yarn**
- **Backend FastAPI** en cours d'exécution (voir le repo backend)
- **PostgreSQL** en cours d'exécution (via docker-compose du backend)

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/Khaoula1025/Secure-Full-Stack-Translation-Platform-Frontend.git
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
```

### 3. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# Environment
NODE_ENV=development
```

## 🏃 Démarrage de l'application

### Mode Développement

```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

### Mode Production

```bash
# Build
npm run build

# Start
npm start
```

## 🐳 Démarrage avec Docker

### 1. Construction de l'image

```bash
docker build -t talait-frontend .
```

### 2. Lancement du conteneur

```bash
docker run -p 3000:3000 --env-file .env.local talait-frontend
```

### 3. Avec Docker Compose (depuis le repo backend)

Le frontend est inclus dans le `docker-compose.yml` du backend :

```bash
# Depuis le répertoire backend
docker-compose up -d
```

## 📁 Structure du Projet

```
talait-frontend/
├── .next/             
│── app/               
│      ├── login/          # Page d'authentification
│      │   └── page.jsx
│      ├── signUp/        # Page d'authentification
│      │   └── page.jsx
│      └── translate/     # Page de traduction
│         └── page.jsx            
├── Dockerfile             # Configuration Docker
├── next.config.js         # Configuration Next.js (rewrites)
├── package.json
└── README.md
```

## ⚙️ Configuration Next.js (Rewrites)

Le fichier `next.config.js` utilise les **rewrites** pour proxy les requêtes API vers le backend, évitant ainsi les problèmes CORS :

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { 
        source: "/api/:path*",
        destination: `${process.env.API_URL || "http://127.0.0.1:8000"}/:path*`
      },
    ];
  },
};

export default nextConfig;
```

### Avantages des Rewrites

- ✅ Pas de configuration CORS nécessaire sur le backend
- ✅ Les cookies sont automatiquement envoyés (same-origin)
- ✅ Simplifie les appels API côté frontend
- ✅ Meilleure sécurité (pas d'exposition de l'URL backend)

### Utilisation

```javascript
// Au lieu de : fetch('http://localhost:8000/login')
// Utiliser : 
fetch('/api/login', {
  method: 'POST',
  credentials: 'include', // Important pour les cookies
  // ...
});
```

## 🔐 Authentification avec Cookies

### Flux d'authentification

1. **Inscription** (`/auth`) :
   - L'utilisateur remplit le formulaire d'inscription
   - Appel à `POST /api/register`
   - Redirection vers la connexion

2. **Connexion** (`/auth`) :
   - L'utilisateur saisit username et password
   - Appel à `POST /api/login`
   - Le backend renvoie le JWT dans un cookie **HttpOnly**
   - Le cookie est automatiquement stocké par le navigateur
   - Redirection vers `/translate`

3. **Requêtes protégées** :
   - Le cookie JWT est automatiquement envoyé avec chaque requête (`credentials: 'include'`)
   - Si le token expire, redirection vers `/auth`

### Gestion des Cookies JWT

```javascript
// src/services/api.js
export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`/api${endpoint}`, {
    ...options,
    credentials: 'include', // Envoie automatiquement les cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (response.status === 401) {
    // Token expiré ou invalide
    window.location.href = '/auth';
    throw new Error('Non authentifié');
  }

  return response;
}
```

### Avantages des Cookies HttpOnly

- ✅ **Sécurité renforcée** : Protection contre les attaques XSS
- ✅ **Automatique** : Pas besoin de gérer manuellement le token
- ✅ **HttpOnly** : Le JavaScript ne peut pas accéder au cookie
- ✅ **Secure** : Transmission uniquement en HTTPS (en production)
- ✅ **SameSite** : Protection contre les attaques CSRF

### Configuration Backend (exemple)

```python
# backend/main.py
@app.post("/login")
async def login(credentials: LoginSchema, response: Response):
    # Vérification des credentials
    token = create_access_token(data={"sub": user.username})
    
    # Définir le cookie HttpOnly
    response.set_cookie(
        key="access_token",
        value=f"Bearer {token}",
        httponly=True,  # Inaccessible au JavaScript
        secure=True,    # HTTPS uniquement (prod)
        samesite="lax", # Protection CSRF
        max_age=3600    # 1 heure
    )
    
    return {"message": "Login successful"}
```

## 🌐 Pages de l'application

### 1. Page d'Authentification (`/auth`)

**URL** : `http://localhost:3000/auth`

**Fonctionnalités** :
- Formulaire d'inscription (username, password)
- Formulaire de connexion (username, password)
- Toggle entre inscription et connexion
- Validation des champs
- Affichage des erreurs
- Le JWT est automatiquement stocké en cookie après connexion

### 2. Page de Traduction (`/translate`)

**URL** : `http://localhost:3000/translate` (protégée)

**Fonctionnalités** :
- Zone de texte pour saisir le texte à traduire
- Sélecteur de direction : FR → EN ou EN → FR
- Bouton de traduction
- Affichage du résultat
- États : loading, error, success
- Bouton de déconnexion (supprime le cookie)

## 🔌 Intégration API avec Fetch

### Service API de base

```javascript
// src/services/api.js

/**
 * Wrapper pour les appels API avec gestion des erreurs
 */
export async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`/api${endpoint}`, {
      ...options,
      credentials: 'include', // Important : envoie les cookies
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Gestion des erreurs HTTP
    if (!response.ok) {
      if (response.status === 401) {
        // Redirection si non authentifié
        window.location.href = '/auth';
      }
      const error = await response.json();
      throw new Error(error.detail || 'Erreur API');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Service d'authentification
 */
export const authService = {
  async register(username, password) {
    return apiRequest('/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  async login(username, password) {
    return apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  async logout() {
    return apiRequest('/logout', {
      method: 'POST',
    });
  },
};

/**
 * Service de traduction
 */
export const translationService = {
  async translate(text, direction) {
    return apiRequest('/translate', {
      method: 'POST',
      body: JSON.stringify({ text, direction }),
    });
  },
};
```

### Endpoints utilisés

| Méthode | Endpoint Frontend | Endpoint Backend | Description | Cookie Requis |
|---------|-------------------|------------------|-------------|---------------|
| POST | `/api/register` | `/register` | Inscription | Non |
| POST | `/api/login` | `/login` | Connexion (set cookie) | Non |
| POST | `/api/logout` | `/logout` | Déconnexion (clear cookie) | Oui |
| POST | `/api/translate` | `/translate` | Traduction de texte | Oui |

## 🛠️ Scripts Disponibles

```bash
# Démarrage en mode développement
npm run dev

# Build de production
npm run build

# Démarrage en production
npm start

# Linting du code
npm run lint
```

## 🎨 Technologies Utilisées

- **Next.js 14** - Framework React avec App Router
- **React 18** - Bibliothèque UI
- **Fetch API** - Client HTTP natif
- **Tailwind CSS** - Framework CSS utilitaire
- **Cookies HttpOnly** - Stockage sécurisé du JWT

## 📝 Gestion des Erreurs

L'application gère plusieurs types d'erreurs :

1. **Erreurs d'authentification** :
   - Identifiants incorrects (401)
   - Cookie expiré (401)
   - Cookie invalide (401)
   - Redirection automatique vers `/auth`

2. **Erreurs de traduction** :
   - Service Hugging Face indisponible (503)
   - Timeout de la requête
   - Format de texte invalide (400)

3. **Erreurs réseau** :
   - Backend inaccessible (fetch error)
   - Timeout de connexion

## 🔒 Sécurité

### Mesures de sécurité implémentées

1. **Cookies HttpOnly** : Le JWT n'est pas accessible via JavaScript
2. **SameSite Cookie** : Protection contre les attaques CSRF
3. **Secure Cookie** : Transmission uniquement en HTTPS (production)
4. **Rewrites Next.js** : Masque l'URL du backend
5. **Credentials Include** : Les cookies sont envoyés automatiquement

### Déconnexion

```javascript
// src/services/api.js
export const authService = {
  async logout() {
    await apiRequest('/logout', {
      method: 'POST',
    });
    // Le backend supprime le cookie
    window.location.href = '/auth';
  },
};
```

## 🔧 Développement

### Convention de code

- **ESLint** : Respecter les règles configurées
- **Prettier** : Formatage automatique du code (optionnel)
- **Commits** : Messages clairs et descriptifs

### Bonnes pratiques

1. Toujours utiliser `credentials: 'include'` avec fetch
2. Gérer les états de chargement (loading, error, success)
3. Valider les formulaires côté client
4. Utiliser les Server Components quand possible
5. Nettoyer les effets secondaires dans useEffect

## 🐛 Dépannage

### Le frontend ne se connecte pas au backend

```bash
# Vérifier que le backend est démarré
curl http://localhost:8000/docs

# Vérifier les variables d'environnement
cat .env.local

# Vérifier les logs du frontend
npm run dev
```

### Les cookies ne sont pas envoyés

**Solution** : Vérifier que `credentials: 'include'` est bien présent dans chaque appel fetch.

```javascript
fetch('/api/translate', {
  method: 'POST',
  credentials: 'include', // OBLIGATOIRE
  body: JSON.stringify(data),
});
```

### Erreur 401 sur /translate

1. Vérifier que le cookie est bien défini (DevTools → Application → Cookies)
2. Vérifier que le cookie n'est pas expiré
3. Tester la connexion à nouveau
4. Vérifier les logs du backend

### Les rewrites ne fonctionnent pas

```javascript
// Vérifier next.config.js
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/:path*',
      },
    ];
  },
};
```

**Important** : Redémarrer le serveur Next.js après modification de `next.config.js`.

### Docker ne démarre pas

```bash
# Reconstruire l'image
docker-compose build frontend --no-cache

# Vérifier les logs
docker-compose logs frontend

# Redémarrer les services
docker-compose restart frontend
```

## 📚 Documentation Complémentaire

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Rewrites](https://nextjs.org/docs/api-reference/next.config.js/rewrites)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [API Backend Documentation](../backend/README.md)


---

**Développé ❤️ pour TalAIt par khaoula esioudi**