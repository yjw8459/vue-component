// Todo: Typescript ESLint Configuation
module.exports = {
  extends: ["plugin:@typscript-eslint/recommanded"],
  parser: "@typescript-eslint/parser",
  plugin: ["@typscript-eslint"],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        disallowTypeAnnotations: false,
        prefer: "type-imports",
      },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
  },
};
