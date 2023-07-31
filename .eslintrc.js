module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:typescript-sort-keys/recommended",
    "@eslint/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ["sort-destructure-keys", "sort-keys-fix"],
  root: true,
  rules: {
    "import/no-named-as-default-member": "off",
    "import/no-unresolved": "off",
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
        },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          {
            group: "external",
            pattern: "vue",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["vue"],
      },
    ],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-useless-concat": "error",
    "prefer-template": "error",
    "sort-destructure-keys/sort-destructure-keys": [
      "error",
      {
        caseSensitive: false,
      },
    ],
    "sort-imports": [
      "error",
      {
        ignoreDeclarationSort: true,
      },
    ],
    "sort-keys-fix/sort-keys-fix": [
      "error",
      "asc",
      {
        natural: true,
      },
    ],
  },
};
