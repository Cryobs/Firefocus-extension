"use strict";

module.exports = {
  env: {
    browser: true,
    es6: true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended"],
  globals: {
    browser: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {// Ваши правила ESLint
  }
};