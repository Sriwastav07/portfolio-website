# Anisha Kumari — Developer Portfolio

A full-stack developer portfolio with a React + Vite frontend and a Node.js + Express + MongoDB backend.

---

## 🗂 Project Structure

```
portfolio/
├── frontend/          # React + Vite + Tailwind CSS + Framer Motion
│   ├── public/
│   │   ├── profile.jpg            ← ADD YOUR PHOTO HERE
│   │   └── Anisha_Kumari_CV.pdf   ← ADD YOUR CV HERE
│   └── src/
│       ├── components/   # Navbar, Hero, About, Skills, Projects, Certificates, Contact, Footer, BackToTop
│       ├── hooks/        # useTheme (dark mode + localStorage), useScrollY
│       ├── data.js       # ALL portfolio content lives here — edit this to update the site
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
└── backend/           # Node.js + Express + MongoDB
    └── src/
        ├── models/    # Contact.js (Mongoose schema)
        ├── routes/    # contact.js (POST /api/contact, GET /api/contact)
        └── server.js  # App entry — MongoDB connect + Express setup
```

---

## 🚀 Local Development

### 1. Clone & install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure environment variables

```bash
# backend/.env  (copy from .env.example)
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/portfolio
FRONTEND_URL=http://localhost:5173
```

### 3. Add your assets

Place these files in `frontend/public/`:
- `profile.jpg` — your profile photo
- `Anisha_Kumari_CV.pdf` — your CV / resume

### 4. Run both servers

```bash
# Terminal 1 — backend
cd backend && npm run dev

# Terminal 2 — frontend (proxies /api → http://localhost:5000)
cd frontend && npm run dev
```

Open http://localhost:5173

---

## ✨ Features

| Feature | Details |
|---|---|
| **Hero** | Two-column layout, profile photo with gradient border, download CV, scroll CTAs |
| **Dark Mode** | Toggle with localStorage persistence + system preference detection |
| **Smooth Scroll** | All nav links and CTA buttons scroll to sections |
| **Contact Form** | Full validation → `POST /api/contact` → saved to MongoDB → success/error feedback |
| **Project Cards** | Title, description, tech stack tags, GitHub link (opens in new tab) |
| **Mobile Menu** | Animated hamburger menu for small screens |
| **Back To Top** | Floating button appears after scrolling 400 px |
| **Framer Motion** | Staggered hero, scroll-triggered section reveals, micro-interactions |

---

## ☁️ Deployment

### Frontend → Vercel

```bash
cd frontend
npm run build          # produces dist/
# Push to GitHub → import repo on vercel.com
# Set VITE_API_URL env var if using a separate backend domain
```

### Backend → Render

1. Create a new **Web Service** on render.com
2. Root directory: `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables: `MONGODB_URI`, `FRONTEND_URL`, `PORT`

### Database → MongoDB Atlas

1. Create a free cluster at mongodb.com/atlas
2. Whitelist `0.0.0.0/0` (or Render's static IP) in Network Access
3. Create a database user and copy the connection string into `MONGODB_URI`

---

## 📝 Updating Content

All text content is in **`frontend/src/data.js`**:
- `profile` — name, title, bio, social links
- `projects` — project cards (title, description, tech, GitHub URL)
- `skills` — skill categories and items
- `certificates` — certificate cards

---

## 🛠 Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, Axios, Lucide React  
**Backend:** Node.js, Express.js, Mongoose  
**Database:** MongoDB Atlas  
**Fonts:** Playfair Display, DM Sans, JetBrains Mono (Google Fonts)
