module.exports = {
  overrides: [
    {
      files: ["**/*.md"],
      processor: "markdown/markdown",
    },
    {
      files: ["**/*.md/*.{js,javascript}"],
      rules: {
        "no-constant-condition": "off",
        "no-prototype-builtins": "off",
        "no-redeclare": "off",
        "no-shadow-restricted-names": "off",
        "no-undef": "off",
        "no-unused-vars": "off",
        "use-isnan": "off",
        "valid-typeof": "off",
      },
    },
    {
      files: ["**/*.md/*.{ts,typescript}"],
      parser: "@typescript-eslint/parser",
      rules: {
        "no-redeclare": "off",
        "no-undef": "off",
        "no-unused-vars": "off",
      },
    },
  ],
  plugins: ["markdown"],
};
