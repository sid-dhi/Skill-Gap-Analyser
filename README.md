
# 🎯 Skill Gap Analyser

A fully functional, client-side React application that helps students identify skill gaps, track learning progress, and receive personalised course recommendations based on their target profession.

![Skill Gap Analyser](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite) ![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- **Profession Selection** — Choose from 6 career paths (Frontend Dev, Data Scientist, UX Designer, DevOps Engineer, Product Manager, Cybersecurity Analyst)
- **Skill Assessment** — Rate your current proficiency (0–10) for each required skill
- **Gap Analysis Dashboard** — Visual radar chart + bar charts showing current vs. target skill levels
- **Course Recommendations** — Curated, profession-specific courses with provider, skill covered, and direct links
- **Progress Tracker** — Mark courses as Not Started / In Progress / Completed with a progress percentage slider
- **Persistent State** — All data saved to `localStorage`; your progress survives page refreshes
- **Responsive UI** — Works on desktop and mobile

---

## 🗂 Project Structure

```
skill-gap-analyser/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── SkillRadarChart.jsx
│   │   ├── SkillBarChart.jsx
│   │   ├── CourseCard.jsx
│   │   └── ProgressBar.jsx
│   ├── data/
│   │   └── professions.js       ← All static profession + course data
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Assessment.jsx
│   │   ├── Courses.jsx
│   │   └── Progress.jsx
│   ├── utils/
│   │   └── gapUtils.js
│   ├── App.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm or yarn

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/skill-gap-analyser.git
cd skill-gap-analyser

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🧩 How It Works

1. **Select Profession** → Go to the Assessment page and pick your target role
2. **Rate Your Skills** → Drag sliders to rate each required skill from 0–10
3. **View Gap Analysis** → Dashboard shows a radar chart + gap breakdown per skill
4. **Browse Courses** → Courses page lists recommendations filtered to your weak areas
5. **Track Progress** → Mark courses in progress / completed; watch your overall score rise

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool |
| Recharts | Radar & bar charts |
| Lucide React | Icons |
| localStorage | Client-side persistence |

---

## 📦 Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.26.0",
  "recharts": "^2.12.7",
  "lucide-react": "^0.414.0"
}
```

---

## 📸 Pages Overview

| Page | Description |
|------|-------------|
| `/` | Dashboard — gap summary, radar chart, overall score |
| `/assessment` | Select profession + rate your skills |
| `/courses` | Course recommendations with progress controls |
| `/progress` | Full progress tracker with stats |

---

## 🤝 Contributing

Pull requests welcome! For major changes, open an issue first.

---


