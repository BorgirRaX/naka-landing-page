# Naka Coffee — Landing Page

A clean, minimal landing page for **Naka Coffee** built with HTML, CSS, and vanilla JavaScript.

---

## 📁 Project Structure

```
naka-lading-page/
├── assets/
│   └── images/
│       ├── logo.png          # Naka Coffee logo
│       └── hero-bg.png       # Hero background image
├── index.html                # Main HTML file
├── styles.css                # Design system + styles
├── script.js                 # Navbar behavior (sticky, mobile menu)
└── README.md
```

## 🎨 Design System

All tokens are defined as CSS custom properties in `styles.css`.

### Colors

| Token                  | Value     | Usage                |
| ---------------------- | --------- | -------------------- |
| `--color-primary`      | `#0C5B46` | Primary / CTA green  |
| `--color-primary-dark` | `#094a38` | Hover state          |
| `--color-background`   | `#FFEBD6` | Page background      |
| `--color-background-alt`| `#FFF9F4`| Navbar / cards       |
| `--color-text-white`   | `#FFF9F4` | Text on dark         |
| `--color-text-dark`    | `#333333` | Body text            |
| `--color-neutral`      | `#8E8E8E` | Muted / secondary    |
| `--color-accent`       | `#D8C3A5` | Accent highlights    |

### Typography

| Token            | Value                 | Usage        |
| ---------------- | --------------------- | ------------ |
| `--font-heading` | Plus Jakarta Sans     | Headings/CTA |
| `--font-body`    | Poppins               | Body text    |

### Spacing & Radius

Consistent spacing scale from `--space-xs` (4 px) to `--space-3xl` (64 px).  
Border radius tokens: `--radius-sm` (6 px), `--radius-md` (10 px), `--radius-lg` (16 px), `--radius-full`.

## 🚀 Getting Started

Open `index.html` in any browser — no build step required.

## 📝 Sections Implemented

1. **Navbar** — Sticky, logo + 4 nav links, responsive mobile menu
2. **Hero** — Full-width background image, heading, subtitle, CTA button
