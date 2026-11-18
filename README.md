# Harismita R. — Personal Portfolio

A creative, interactive one-page portfolio built with **HTML5, CSS3 and vanilla JavaScript (ES6+)**.

## Run locally
1. Extract the ZIP file.
2. Open the `harismita-portfolio` folder in Visual Studio Code.
3. Open `index.html` in your browser, or use the Live Server extension if available.
4. Edit content in `index.html`, design tokens in `css/theme.css`, styles in `css/style.css`, and interactions in `js/main.js`.

## Required sections
- `#hero` — Opening Frame
- `#journey` — The Beginning
- `#interests` — What Shapes Me (includes selected projects)
- `#family` — My Foundation
- `#hobbies` — Outside the Frame
- `#footer` — The Next Chapter

## Interactions
- Three themes: Light, Dark and Warm (saved in localStorage)
- Scroll progress and chapter indicator
- Scroll reveal animations
- Interactive project case-study dialogs
- Mobile navigation
- Visitor note reveal

## Technology constraints
No frontend framework, CSS framework, jQuery, TypeScript, npm package or build step is used. Google Fonts are loaded from Google Fonts; the site itself runs as static HTML/CSS/JS.

## Personalise before publishing
- Confirm the contact email and replace it if needed.
- Add real project screenshots to `images/projects/` and your portrait is stored at `images/profile.jpeg`; replace it with another image if needed.
- Add verified GitHub / LinkedIn profile links when available.
- Family and hobby illustrations are CSS/emoji placeholders, not actual portraits.
- Keep project descriptions aligned with what you personally built.

## Assessment CI workflows
The workflow files in `.github/workflows/` are starter checks for validation, pull requests, deployment, Lighthouse and notifications. Review the deployment and notification secrets/targets before enabling those workflows in a real repository. GitHub Pages deployment requires Pages to be enabled and the repository permission configuration to allow deployment.
