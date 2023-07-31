/** @type {import('vls').VeturConfig} \*/
module.exports = {
  // **optional** default: `{}`
  // override vscode settings
  // Notice: It only affects the settings used by Vetur.
  settings: {
    "vetur.useWorkspaceDependencies": true,
    "vetur.experimental.templateInterpolationService": true,
  },
  projects: [
    "./packages/@docs/note", // Shorthand for specifying only the project root location
    "./packages/@webapp/todo",
  ],
};
