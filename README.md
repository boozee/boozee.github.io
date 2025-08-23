# Personal Portfolio Site — Data‑Driven Jekyll

This repository contains the source code for my personal website at <https://boozee.github.io>. It is built with **Jekyll**, uses **YAML** data files to drive structured sections (CV, skills, projects and hobbies) and is designed to be simple to host on GitHub Pages while remaining flexible to extend.

## Rationale

I wanted a single place to showcase my professional experience, areas of expertise and a few personal interests without relying on a proprietary platform. The site was originally generated from the academicpages template, but most of the layout has since been rewritten or heavily customised. The key goals were:

- **Keep content and presentation separate.** Sections such as the CV, skills list, hobbies and projects are stored as data files under `_data/` and rendered via Liquid templates. Updating your experience or adding a new hobby does not require touching the markup.
- **Support dynamic UX on a static site.** A small JavaScript layer uses **PJAX** to load pages without a full refresh. It also powers the theme switcher (light/dark mode) and the embedded music player.
- **Be fast and easy to host.** There is no backend; everything is static and deploys via the GitHub Pages action. A `Dockerfile` and `docker‑compose.yml` are included to replicate the production environment locally.

## Features

- **CV:** A timeline‑style résumé built from YAML data (`_data/cv.yml`), with tabs for work experience, education and certifications. Technology tags highlight tools used for each role.
- **Skills:** Colour‑coded badges classify languages, frameworks, tools, leadership skills and supported platforms; proficiency is marked as expert, strong or working.
- **Philosophy:** Short essays on work ethics, tech principles, collaboration and quality.
- **Projects:** Cards with links to repositories for personal projects. New projects can be added via `_data/projects.yml`.
- **Hobbies:** A grid of non‑technical interests. Each item lives in `_data/hobbies.yml`.
- **Contact:** Social icons (GitHub, LinkedIn, Spotify, Instagram) and an email form. The form uses Netlify Forms syntax, so submissions are delivered without a custom backend.
- **Dark/light theme:** Toggle at the bottom right. The colour palette is defined in Sass variables.
- **Music player:** A list of songs that inspire me, controlled by a simple JavaScript widget. Moves to the bottom bar on small screens.

## Technologies

- **Jekyll** — static site generator
- **YAML** data files — content for CV, skills, projects and hobbies
- **Sass (SCSS)** — modular styling with variables and mixins
- **JavaScript / PJAX** — page transitions, music player and dark‑mode toggle
- **Liquid** templates — layouts and includes
- **Docker / Docker Compose** — local development environment (serves the site with the same Ruby version as GitHub Pages)

## Local Development

To run the site locally without installing Ruby on your host machine, you can use Docker:

```bash
# clone the repository
git clone https://github.com/boozee/boozee.github.io
cd boozee.github.io

# build and serve using docker compose
docker-compose up
```

This will start a Jekyll server at <http://localhost:4000> and watch for changes in your files. Alternatively, if you have Ruby and Bundler installed locally, run:

```bash
bundle install
bundle exec jekyll serve
```

## Roadmap

The repository has evolved significantly since its inception. Major milestones include:

- **Initial setup (Feb 2025):** Generated the skeleton from academicpages, added avatar and initial settings, and removed unused VS Code files. Customised some pages and personalised the README.
- **Complete overhaul (Aug 2025):** Modularised the home page and CV, split large SCSS files, added a dynamic gradient background and a hero card, and refined badges. Added real CV data and skills, separated the CV into experience/education/certifications tabs and implemented a light/dark theme.
- **Enhanced interactivity (Aug 2025):** Introduced a bottom bar with a music player and theme switcher, added the music playlist, moved languages to the home page and improved the contact form UI. Added a Dockerfile for development parity.
- **New sections (late Aug 2025):** Added philosophy and hobbies pages, including sections such as economy and sofa athletics. Created a certifications tab to showcase Scrum and RealWear credentials. Added a “Projects” tab with cards; currently includes this site and a teaser for an undisclosed project.
- **Ongoing improvements:** A flurry of refinements and bug fixes around responsiveness, spacing, accessibility and grammar (e.g., improved English, cleaned CSS, fixed the “more” button navigation, and reorganised data files). See the commit history for details.

## Upcoming ideas

- Integrate screenshots or GIFs into the Projects section to better illustrate each project.
- Add a blog or “Notes” section for longer articles, possibly powered by Markdown posts.
- Improve accessibility by adding alt text to images and reducing reliance on colour alone for skill badges.
- Localize content for multiple languages using Jekyll’s i18n plugins.

## Contributing

This is a personal portfolio, so contributions are not expected. If you spot a bug or would like to discuss improvements, feel free to open an issue or contact me via the links on the site.
