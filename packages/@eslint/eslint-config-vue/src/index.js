module.exports = {
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-recommended",
    "@vue/typescript/recommended",
  ],
  parser: "vue-eslint-parser",
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "vue/attributes-order": [
      "error",
      {
        alphabetical: true,
      },
    ],
    "vue/block-lang": [
      "error",
      {
        script: {
          lang: "ts",
        },
      },
    ],
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        ignores: ["i18n-t"],
        registeredComponentsOnly: false,
      },
    ],
    "vue/define-macros-order": [
      "error",
      {
        order: ["defineProps", "defineEmits"],
      },
    ],
    "vue/first-attribute-linebreak": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/html-closing-bracket-spacing": "error",
    "vue/html-comment-content-newline": [
      "error",
      {
        multiline: "always",
        singleline: "never",
      },
    ],
    "vue/html-comment-content-spacing": "error",
    "vue/html-comment-indent": ["error", "tab"],
    "vue/html-indent": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: { component: "always", normal: "always", void: "any" },
      },
    ],
    "vue/max-attributes-per-line": "off",
    "vue/next-tick-style": ["error", "promise"],
    "vue/no-template-shadow": "off",
    "vue/no-undef-components": [
      "error",
      {
        ignorePatterns: ["Router[Link|View]", "i18n-t"],
      },
    ],
    "vue/no-undef-properties": "error",
    "vue/no-unused-refs": "error",
    "vue/no-useless-v-bind": "error",
    "vue/order-in-components": "off",
    "vue/padding-line-between-blocks": "error",
    "vue/prefer-separate-static-class": "error",
    "vue/prefer-true-attribute-shorthand": "error",
    "vue/require-default-prop": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/v-on-event-hyphenation": [
      "error",
      "always",
      {
        autofix: true,
      },
    ],
  },
};
