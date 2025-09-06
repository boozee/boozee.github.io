/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard-scss"],
  ignoreFiles: [
    "_site/**",
    "node_modules/**",
    "memory-bank/**"
  ],
  rules: {
    // Allow legacy color functions like rgba() for Sass/Jekyll compatibility
    "color-function-notation": "legacy",
    // If your linter complains with color-function-alias-notation, disable it
    "color-function-alias-notation": null,
    // Keep numeric alpha values (e.g., 0.12) which we use in rgba()
    "alpha-value-notation": "number"
  }
};

