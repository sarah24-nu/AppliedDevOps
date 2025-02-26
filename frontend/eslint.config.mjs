import globals from "globals";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: { version: "detect" }, // ✅ Automatically detect React version
    },
    rules: {
      "react/prop-types": "off", // ✅ Disable PropTypes validation
      "react/no-unescaped-entities": "off", // ✅ Allow unescaped characters (e.g., single quotes)
      "no-unused-vars": "off",
      "react/react-in-jsx-scope": "off",
      "no-console": "off",
    },
  },
];
