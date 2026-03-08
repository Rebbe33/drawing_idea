# 🎨 Générateur d'Idées de Dessin

Application web pour générer des idées de dessin créatives alimentées par l'IA Claude.

## 📁 Structure du Projet

```
drawing-ideas-app/
├── frontend/          # Application React (Vite)
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/           # API Node.js + Express
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## 🚀 Installation Locale

### Backend

1. **Navigue dans le dossier backend**
   ```bash
   cd backend
   ```

2. **Installe les dépendances**
   ```bash
   npm install
   ```

3. **Configure les variables d'environnement**
   ```bash
   cp .env.example .env
   ```
   
   Édite `.env` et ajoute ta clé API Anthropic :
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   PORT=3001
   ```

4. **Lance le serveur**
   ```bash
   npm start
   # ou en mode dev avec hot reload:
   npm run dev
   ```

### Frontend

1. **Navigue dans le dossier frontend**
   ```bash
   cd frontend
   ```

2. **Installe les dépendances**
   ```bash
   npm install
   ```

3. **Lance l'application**
   ```bash
   npm run dev
   ```

L'app sera accessible sur `http://localhost:3000`

## 📦 Déploiement

### Option 1 : Vercel (Recommandé)

#### Backend sur Vercel

1. **Crée un fichier `vercel.json` dans `/backend`**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/server.js"
       }
     ]
   }
   ```

2. **Déploie le backend**
   ```bash
   cd backend
   vercel
   ```

3. **Configure les variables d'environnement sur Vercel**
   - Dashboard Vercel → Project Settings → Environment Variables
   - Ajoute `ANTHROPIC_API_KEY`

4. **Note l'URL du backend** (ex: `https://your-backend.vercel.app`)

#### Frontend sur Vercel

1. **Mets à jour `frontend/src/App.jsx`**
   Remplace la ligne :
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
   ```
   
   Par l'URL de ton backend déployé :
   ```javascript
   const API_URL = 'https://your-backend.vercel.app';
   ```

2. **Déploie le frontend**
   ```bash
   cd frontend
   vercel
   ```

### Option 2 : Railway

1. **Backend**
   - Connecte ton repo GitHub à Railway
   - Sélectionne le dossier `/backend`
   - Ajoute la variable `ANTHROPIC_API_KEY`
   - Deploy automatique

2. **Frontend**
   - Nouveau service Railway
   - Sélectionne le dossier `/frontend`
   - Mets à jour `VITE_API_URL` avec l'URL du backend
   - Deploy automatique

### Option 3 : Netlify (Frontend) + Render (Backend)

#### Backend sur Render

1. Crée un nouveau **Web Service** sur Render
2. Connecte ton repo GitHub
3. Configure :
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Ajoute la variable d'environnement `ANTHROPIC_API_KEY`

#### Frontend sur Netlify

1. Crée un nouveau site sur Netlify
2. Configure :
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
3. Ajoute une variable d'environnement :
   - `VITE_API_URL` = URL de ton backend Render

## 🔐 Sécurité

⚠️ **IMPORTANT** : Ne jamais committer le fichier `.env` avec ta clé API !

- Le `.env` est dans `.gitignore`
- Utilise les variables d'environnement de la plateforme de déploiement
- Pour le frontend en production, utilise `VITE_API_URL` pour pointer vers le backend

## 📝 Variables d'Environnement

### Backend
- `ANTHROPIC_API_KEY` : Ta clé API Anthropic (obligatoire)
- `PORT` : Port du serveur (défaut: 3001)

### Frontend
- `VITE_API_URL` : URL de l'API backend (défaut: http://localhost:3001)

## 🛠️ Technologies Utilisées

- **Frontend** : React 18, Vite
- **Backend** : Node.js, Express
- **AI** : Claude API (Anthropic)
- **Déploiement** : Vercel / Railway / Netlify + Render

## 📄 License

MIT
