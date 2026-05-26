# 🚀 GitHub Portfolio — Futuristic Dev Dashboard

> A stunning, futuristic GitHub profile portfolio website with live GitHub stats, glassmorphism UI, and neon aesthetics. Built with React + TypeScript + Framer Motion.

![Preview](preview.png)

## ✨ Features

- 🎨 **Futuristic UI** — Glassmorphism + Neon + Cyberpunk aesthetic
- 📊 **Live GitHub Stats** — Auto-fetched from GitHub API (followers, repos, stars, forks)
- 🌐 **GitHub Streaks** — Integrated with github-readme-streak-stats
- 💻 **Language Distribution** — Visual breakdown of your coding languages
- 🗂️ **Project Showcase** — Auto-fetched repos with filter by language
- 🛠️ **Skills Section** — Animated skill bars with proficiency levels
- 📅 **Timeline** — Career journey and experience
- 📬 **Contact Section** — Email + social media links
- 🎯 **Custom Cursor** — Futuristic neon cursor (desktop)
- 🌙 **Dark/Light Mode** — Theme toggle
- ✍️ **Typing Animation** — Dynamic role titles
- 🎆 **Particle Background** — Animated ambient particles
- 📱 **Fully Responsive** — Mobile + Desktop
- ⚡ **Fast** — Vite + lazy loading

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| GitHub REST API | Live Data |

---

## 🚀 Quick Start (5 menit online!)

### 1. Install Node.js
Download dari https://nodejs.org/ (pilih LTS version)

Verifikasi instalasi:
```bash
node --version  # should print v18+
npm --version   # should print v9+
```

### 2. Clone / Download Project
```bash
# Jika pakai git:
git clone https://github.com/yourusername/github-portfolio.git
cd github-portfolio

# Atau extract ZIP yang sudah didownload, lalu:
cd github-portfolio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Konfigurasi Data Kamu

**Edit file utama:** `src/lib/config.ts`

```typescript
export const CONFIG = {
  GITHUB_USERNAME: 'username_github_kamu',  // ← GANTI INI
  name: 'Nama Lengkap Kamu',               // ← GANTI INI
  title: 'Full-Stack Developer',            // ← GANTI INI
  // ... dst
}
```

### 5. Setup Environment Variables (Opsional tapi Dianjurkan)
```bash
# Copy file contoh
cp .env.example .env

# Edit .env:
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

> **Cara dapat GitHub Token:**
> 1. Buka https://github.com/settings/tokens
> 2. Klik "Generate new token (classic)"
> 3. Centang: `public_repo`, `read:user`
> 4. Copy token ke `.env`
>
> Tanpa token: API limit 60 req/jam
> Dengan token: API limit 5000 req/jam

### 6. Run Development Server
```bash
npm run dev
```

Buka browser: `http://localhost:5173`

### 7. Build untuk Production
```bash
npm run build
npm run preview  # preview production build
```

---

## 🌐 Deploy ke Vercel (Cara Termudah)

### Metode 1: Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Metode 2: Via GitHub (Auto Deploy)
1. Push project ke GitHub
2. Buka https://vercel.com/new
3. Import repository kamu
4. Tambah Environment Variables:
   - `VITE_GITHUB_TOKEN` = token kamu
5. Klik Deploy → Live dalam 1-2 menit!

---

## 🌐 Deploy ke Netlify

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

Atau via GUI:
1. Build dulu: `npm run build`
2. Drag-drop folder `dist` ke https://app.netlify.com/drop

---

## 🌐 Deploy ke GitHub Pages

1. Install gh-pages:
```bash
npm install -D gh-pages
```

2. Tambah ke `package.json`:
```json
"scripts": {
  "deploy": "gh-pages -d dist"
},
"homepage": "https://yourusername.github.io/github-portfolio"
```

3. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/github-portfolio/',
  // ...
})
```

4. Deploy:
```bash
npm run build
npm run deploy
```

---

## 🎨 Cara Custom Tampilan

### Ganti Warna Neon
Edit `tailwind.config.ts`:
```typescript
neon: {
  blue: '#00d4ff',    // ← ganti warna utama
  purple: '#a855f7',  // ← ganti accent
  cyan: '#06ffd8',    // ← ganti highlight
}
```

### Ganti Font
Edit `index.html`, ganti Google Fonts URL:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont..." />
```

Update `tailwind.config.ts`:
```typescript
fontFamily: {
  display: ['"Your Display Font"', 'sans-serif'],
}
```

### Tambah/Edit Skills
Edit `src/lib/config.ts`, bagian `skills`:
```typescript
skills: [
  { name: 'React', level: 92, category: 'Frontend', color: '#61dafb' },
  // Tambah lebih banyak...
]
```

### Edit Timeline/Pengalaman
Edit `src/lib/config.ts`, bagian `timeline`:
```typescript
timeline: [
  {
    year: '2024',
    title: 'Senior Developer',
    company: 'Company Name',
    description: 'Deskripsi kerjaan...',
    tags: ['React', 'Node.js'],
    type: 'work',  // 'work' | 'education' | 'achievement'
  },
]
```

---

## 📁 Struktur Project

```
github-portfolio/
├── public/
│   └── favicon.svg          # Favicon
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── CustomCursor.tsx     # Custom neon cursor
│   │   │   ├── Navbar.tsx           # Floating navbar
│   │   │   └── ParticlesBackground.tsx  # Animated background
│   │   ├── sections/
│   │   │   ├── Hero.tsx             # Landing hero section
│   │   │   ├── GitHubStats.tsx      # Live GitHub dashboard
│   │   │   ├── Projects.tsx         # Repo showcase
│   │   │   ├── Skills.tsx           # Tech skills
│   │   │   ├── Timeline.tsx         # Experience timeline
│   │   │   └── Contact.tsx          # Contact + socials
│   │   └── ui/
│   │       ├── LoadingScreen.tsx    # Boot-up animation
│   │       ├── NeonButton.tsx       # Reusable button
│   │       ├── GlassCard.tsx        # Glass card component
│   │       └── Badge.tsx            # Tag badge
│   ├── hooks/
│   │   ├── useGitHub.ts            # GitHub API fetching
│   │   ├── useTheme.ts             # Dark/light mode
│   │   └── useMousePosition.ts     # Mouse tracking
│   ├── lib/
│   │   ├── config.ts               # ⭐ EDIT INI untuk custom data
│   │   └── utils.ts                # Helper functions
│   ├── types/
│   │   └── index.ts                # TypeScript types
│   ├── App.tsx                     # Root component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
├── .env.example                    # Environment template
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## 🔧 Troubleshooting

### Error: "GitHub user not found"
→ Pastikan `GITHUB_USERNAME` di `config.ts` sudah benar
→ Cek koneksi internet

### Error: "API rate limit exceeded"
→ Tambah `VITE_GITHUB_TOKEN` ke file `.env`
→ GitHub API limit: 60 req/jam tanpa token, 5000 req/jam dengan token

### Build error: "Cannot find module..."
```bash
rm -rf node_modules package-lock.json
npm install
```

### Animasi lambat di mobile
→ Normal, framer-motion berat di low-end devices
→ Bisa disable animasi di mobile dengan media query

### Gambar profil tidak muncul
→ GitHub avatar di-fetch otomatis dari API
→ Pastikan `GITHUB_USERNAME` benar

---

## 🌍 Hosting Gratis

| Platform | Kelebihan | Link |
|----------|-----------|------|
| **Vercel** | Tercepat, auto SSL, CDN global | vercel.com |
| **Netlify** | Mudah, form handling | netlify.com |
| **GitHub Pages** | Gratis selamanya | pages.github.com |
| **Cloudflare Pages** | Sangat cepat | pages.cloudflare.com |

## 🏷️ Domain Gratis

- **is-a.dev** — `yourusername.is-a.dev`
- **GitHub Pages** — `username.github.io`
- **Freenom** — `.tk`, `.ml`, `.ga` (limited)

---

## 📤 Upload ke GitHub

```bash
git init
git add .
git commit -m "🚀 Initial portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/github-portfolio.git
git push -u origin main
```

---

## 🔄 Update Project di Masa Depan

```bash
# Edit file di src/lib/config.ts
# Lalu:
git add .
git commit -m "✨ Update portfolio data"
git push

# Vercel/Netlify akan auto-deploy!
```

---

## 📄 License

MIT License — Feel free to use and modify!

---

<p align="center">
  Built with ❤️ using React + Framer Motion + Tailwind CSS
</p>
