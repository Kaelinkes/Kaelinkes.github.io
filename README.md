# Kaelin Kesavjee — Portfolio

> Personal portfolio website built with vanilla HTML, CSS and JavaScript. No frameworks, no build tools — just clean, fast, deployable files.

🌐 **Live site:** [kaelinkes.github.io](https://kaelinkes.github.io)

---

## Overview

A fully responsive, multi-page portfolio showcasing my education, skills, certifications and GitHub projects. Features a dark/light theme toggle that respects the user's OS preference, live GitHub stats, animated particle backgrounds, and a working contact form that saves submissions to Google Sheets.

---

## Pages

| File | Description |
|---|---|
| `index.html` | Home — avatar, typing animation, live GitHub stats, social links |
| `about.html` | About — bio, tech stack, skills, education with expandable coursework, certifications, interests |
| `projects.html` | Projects — live GitHub repo grid with search, filter, sort and file/README viewer |
| `contact.html` | Contact — form that saves to Google Sheets, social links |
| `404.html` | Custom not found page with countdown redirect to GitHub |

---

## File Structure

```
├── index.html
├── about.html
├── projects.html
├── contact.html
├── 404.html
├── styles.css          # All shared styles
├── script.js           # Shared JS — theme, particles, GitHub API utils
└── assets/
    └── Kaelin_Kesavjee_CV.pdf
```

---

## Features

- **Dark / Light mode** — animated sun/moon toggle, follows OS `prefers-color-scheme`, persists via `localStorage`
- **Live GitHub stats** — public repos, total stars, total commits, commits this year via GitHub API
- **Project explorer** — searchable, filterable repo grid with an in-page file tree and README viewer
- **Credly badges** — certifications auto-load from Credly with a static fallback
- **Contact form** — submissions saved to Google Sheets via Apps Script webhook (no email required)
- **Particle backgrounds** — subtle gold (dark) / silver (light) floating particles on Home and Contact pages
- **Scroll progress bar** — thin gold indicator on the About page content area
- **SEO & Open Graph** — meta tags for Google indexing and social share previews
- **Custom favicon** — KK initials in gold on a dark background
- **Custom 404** — branded not found page with 5-second countdown redirect to GitHub

---

## Tech Stack

Built entirely with:

- **HTML5** — semantic, no frameworks
- **CSS3** — custom properties, grid, flexbox, keyframe animations
- **Vanilla JavaScript** — no jQuery, no bundler
- **GitHub REST API** — repo data, commit counts
- **Credly API** — badge data via CORS proxy
- **Google Apps Script** — contact form webhook to Google Sheets

---

## Deployment

This site is hosted on **GitHub Pages** from the root of this repository.

To deploy your own copy:

1. Fork or clone this repo
2. Update `GH_USER` in `script.js` to your GitHub username
3. Update the `og:url` meta tag in `index.html` to your GitHub Pages URL
4. Add your CV as `assets/Kaelin_Kesavjee_CV.pdf`
5. Set up Google Sheets + Apps Script (see below) and update `SHEETS_URL` in `contact.html`
6. Push to GitHub and enable Pages in repo Settings → Pages → Branch: `main` / root

---

## Contact Form Setup (Google Sheets)

1. Create a Google Sheet with columns: `Timestamp`, `Name`, `Surname`, `Email`, `Message`
2. Open **Extensions → Apps Script** and paste:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), data.name, data.surname, data.email, data.message]);
  return ContentService.createTextOutput("OK");
}
```

3. Deploy as a **Web App** with access set to **Anyone**
4. Copy the Web App URL and replace `SHEETS_URL` in `contact.html`

---

## Tools Used

This portfolio was built with the help of modern tools:

| Tool | Purpose |
|---|---|
| **Claude (Anthropic)** | Advanced coding concepts, architecture decisions, and implementation |
| **ChatGPT (OpenAI)** | Ideas, content suggestions, and brainstorming |
| **Canva** | Design inspiration and visual reference |

---

## License

This project is open source. Feel free to use it as a reference or template — just don't copy the personal content (bio, education, certifications, etc.).

---

*Built by Kaelin Kesavjee — 2025*
