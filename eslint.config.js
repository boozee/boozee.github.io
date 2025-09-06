// Flat config for ESLint v9
// Uses browser globals for site JS under assets/, and Node for configs

const yml = require("eslint-plugin-yml");
/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  // Global ignores (replacement for .eslintignore in flat config)
  {
    ignores: [
      "_site/**",
      ".jekyll-cache/**",
      "node_modules/**",
      "vendor/**",
      "assets/**/*.min.js",
      "assets/vendor/**"
    ]
  },

  // Browser scripts
  {
    files: ["assets/js/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        // Common browser globals
        window: "readonly",
        document: "readonly",
        location: "readonly",
        history: "readonly",
        navigator: "readonly",
        URL: "readonly",
        DOMParser: "readonly",
        MutationObserver: "readonly",
        setTimeout: "readonly",
        requestAnimationFrame: "readonly",
        CustomEvent: "readonly",

        // Project-specific globals
        YT: "readonly",
        setupTabListeners: "readonly"
      }
    },
    rules: {
      // Reasonable best practices
      "no-var": "error",
      "prefer-const": ["warn", { destructuring: "all" }],
      eqeqeq: ["error", "smart"],
      curly: ["error", "multi-line"],
      "dot-notation": "error",
      "no-implicit-coercion": "warn",
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_$"
        }
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-alert": "warn",
      yoda: ["error", "never"],
      "consistent-return": "warn",
      "prefer-template": "warn",
      "object-shorthand": ["warn", "always"],
      "arrow-body-style": ["warn", "as-needed"],
      "no-useless-return": "warn",
      "no-unneeded-ternary": "warn",
      "prefer-arrow-callback": "warn"
    }
  },

  // YAML via eslint-plugin-yml (flat recommended)
  ...(
    (() => {
      try {
        return yml.configs["flat/recommended"] || [];
      } catch (_) {
        return [];
      }
    })()
  ),

  // Node/CommonJS for config files
  {
    files: ["eslint.config.js", "stylelint.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        process: "readonly"
      }
    }
  }
];
