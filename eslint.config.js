import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: [
      "node_modules",
      "coverage",
      "**/__tests__/**",
      "**/*.test.js",
      "**/*.spec.js",
    ],
    plugins: { js },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    extends: ["js/recommended"],
  },
]);
