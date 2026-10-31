# Shuttle to You

Answer five quick questions and a space shuttle flies you to the planet you relate to most. Your result comes as a boarding pass with your planet, a short reason it fits you, and a fun fact.

## How it works

1. Enter your name.
2. Answer five multiple-choice questions about your personality.
3. Each answer adds points to one or two planets.
4. The planet with the most points is your destination.

If two planets tie, the one that comes first in the list (Mercury through Neptune) wins.

## Run it locally

No build step or dependencies. Clone the repo and open `index.html` in your browser.

```bash
git clone https://github.com/YOUR-USERNAME/shuttle-to-you.git
cd shuttle-to-you
open index.html
```

## Deploy with GitHub Pages

1. Push the repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then pick `main` and `/ (root)`.
4. Your demo link will be `https://YOUR-USERNAME.github.io/shuttle-to-you/`.

## Project structure

```
shuttle-to-you/
├── index.html   # page markup
├── style.css    # styles and boarding pass layout
├── script.js    # questions, planet data, scoring
└── README.md
```

## Customize it

- Add or change questions in the `QUESTIONS` array in `script.js`.
- Edit planet text and colors in the `PLANETS` object.
- Each option's `pts` object controls which planets get points.

## Built with

HTML, CSS, and vanilla JavaScript. Typeface: Bricolage Grotesque (Google Fonts).

