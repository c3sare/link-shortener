import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import unicorn from "eslint-plugin-unicorn";
import simpleImportSort from "eslint-plugin-simple-import-sort";

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
		"plugin:playwright/recommended",
	),
	{
		plugins: {
			unicorn,
			"simple-import-sort": simpleImportSort,
		},
		rules: {
			"simple-import-sort/exports": "error",
			"simple-import-sort/imports": "error",
			"unicorn/no-array-callback-reference": "off",
			"unicorn/no-array-for-each": "off",
			"unicorn/no-array-reduce": "off",
			"unicorn/prevent-abbreviations": "off",
		},
	},
];

export default eslintConfig;
