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

## Design system: edit once, update everywhere

The visual design tokens live in **`css/theme.css` only**. This file is the source of truth for brand colours, surfaces, text colours, decorative palette, typography, spacing scale, layout widths, radii, shadows and motion timing. `css/style.css` consumes those values with `var(--token-name)`; avoid adding new literal colours or font stacks to component rules.

To change the site's shared look, edit the relevant token in `css/theme.css`. The `data-theme` variants (`light`, `dark`, `warm`) override the same token names, so components update together without editing every selector. The theme switch is implemented in vanilla JavaScript and remembers the selected theme in local storage.

## Interactions

- Responsive navigation with a vanilla-JS mobile menu.
- Three theme modes (light, dark and warm).
- Scroll reveal and section progress indicators.
- Family cards flip on click/tap and keyboard activation.
- Hobby photographs open in an accessible native `<dialog>` lightbox.
- Project cards open native dialog case studies.
- Footer year is generated automatically.

## GitHub Actions

Five workflows are included under `.github/workflows/`: HTML/CSS validation, GitHub Pages deployment, PR quality checks, Lighthouse auditing and deployment notifications. Add a repository Actions secret named `SLACK_WEBHOOK_URL` to enable Slack notifications; without it, the workflow reports the result in its logs and skips the external message.

## Personal assets to add before submission

Add an approved family group photograph to `images/family/` and update the family banner to use it if you are comfortable sharing it. The current banner is an abstract visual, not a real family photograph. Replace the generic GitHub profile destination in the footer with your own GitHub profile URL. The five interest descriptions are intentionally broad; personalise them with your actual favourite artists, titles, dishes, books and destinations before final submission.

## Code validation
- HTML is checked with HTMLHint using `.htmlhintrc`.
- CSS is checked with Stylelint using `.stylelintrc.json`.
- The GitHub Actions validation workflow runs on pushes and pull requests.
