/**
 * Add route Generator
 */

/* eslint strict: ["off"] */

"use strict"

module.exports = {
  description: "Add source code and new route",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "What is page name?",
      default: "login"
    },
    {
      type: "input",
      name: "uri",
      message: "What is uri path?",
      default: "/"
    }
  ],
  actions: (data) => {
    // Generate index.js
    const actions = [
      {
        type: "add",
        path: "../frontend-app/src/pages/{{name}}/index.js",
        templateFile: "./frontend/pages/index.js.hbs",
        abortOnFail: true
      },
      {
        type: "append",
        path: "../frontend-app/src/App.js",
        pattern: `/* inject import */`,
        template: `import {{pascalCase name}}Page from './pages/{{name}}';`
      },
      {
        type: "append",
        path: "../frontend-app/src/App.js",
        pattern: `{/* inject route */}`,
        template: `<Route path="{{uri}}" element={<{{pascalCase name}}Page />} />`
      },
      {
        type: "add",
        path: "../frontend-app/src/appConfig.json",
        templateFile: "./frontend/appConfig.json",
        abortOnFail: true
      }
    ]

    return actions
  }
}
