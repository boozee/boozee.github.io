# Data‑Driven Jekyll Personal Site

A GitHub Pages–compatible Jekyll site with data-driven sections (CV, Skills, Projects, Hobbies), light/dark theme toggle, and Docker dev setup.

## Run locally (Docker)

```bash
# From project root
docker compose up
# then open http://localhost:4000
```

Or without Compose:

```bash
docker run --rm -it -p 4000:4000 -v "$PWD":/srv/jekyll -w /srv/jekyll jekyll/jekyll:4.3 jekyll serve --livereload --force_polling --host 0.0.0.0
```

## Deploy to GitHub Pages

1. Create a repo named `<username>.github.io` (user site) **or** any repo (project site).
2. Push this project.
3. In repo settings → **Pages**, set:
   - Source: **Deploy from a branch**
   - Branch: `main` (or `master`) `/ (root)`
4. For project sites, set `_config.yml`:
   ```yml
   url: "https://<username>.github.io"
   baseurl: "/<repo-name>"
   ```

## Customize content

Edit data files in `_data/`:
- `cv.yml` — work experience, education, contacts
- `skills.yml` — categories and skills
- `projects.yml` — projects list
- `hobbies.yml` — hobbies list
- `navigation.yml` — (optional) override nav

Site styles are in `assets/css/site.css`. Theme toggle is in `assets/js/theme.js`.
