// HTML-Validate configuration
// Lints generated HTML under `_site/` to avoid Liquid parsing issues.

/** @type {import('html-validate').ConfigData} */
module.exports = {
  // Looser baseline to reduce noise on generated output
  extends: ["html-validate:document"],
  elements: ["html5"],
  rules: {
    // Keep it practical for static site output
    // Generated HTML often contains trailing spaces; ignore them
    "no-trailing-whitespace": "off",
    // Buttons without explicit type are common in themes; reduce to a warning
    "no-implicit-button-type": "warn",
    // Icon-only buttons may not have visible text; reduce to a warning
    "text-content": "warn",
    // Some pages intentionally start at h2/h3; don't enforce initial <h1>
    "heading-level": "off",
    // Use lowercase doctype as in templates; keep as a warning
    "doctype-style": ["warn", { "style": "lowercase" }],
    // Mixed sources (Jekyll plugins) may produce <meta/> etc.; don't enforce
    "void-style": "off",
    // Jekyll often injects attributes/classes; allow inline styles if needed
    "no-inline-style": "off",
    // Do not require SRI for local or templated scripts in this project
    "require-sri": "off"
  }
};
