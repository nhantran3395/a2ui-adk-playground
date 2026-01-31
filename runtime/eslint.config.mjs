import js from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import { fixupPluginRules } from "@eslint/compat";

export default tseslint.config(
  // 1. Basic JS Recommended
  js.configs.recommended,

  // 2. TS Recommended (handles parser & plugin automatically)
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: {
      import: fixupPluginRules(importPlugin),
      "unused-imports": fixupPluginRules(unusedImports),
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        node: true,
      },
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "no-unused-vars": "off", // Turn off base rule as we use unused-imports
      "@typescript-eslint/no-unused-vars": "off",
      "import/no-unresolved": "error",
      "import/named": "error",
    },
  },
  {
    // Ignore build folders and config files if necessary
    ignores: ["dist/", "node_modules/", "eslint.config.mjs"],
  },
);