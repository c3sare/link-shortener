import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import unicorn from "eslint-plugin-unicorn";
import { dirname } from "path";
import { fileURLToPath } from "url";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  js.configs.recommended,
  ...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:playwright/recommended"
  ),
  {
    plugins: {
      unicorn,
    },
    rules: {
      "unicorn/no-array-callback-reference": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/prevent-abbreviations": "off",
    },
  },
  eslintConfigPrettier,
];

export default eslintConfig;
