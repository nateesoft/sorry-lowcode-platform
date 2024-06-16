/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const pageExists = require('../utils/pageExists');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'input',
      name: 'projectId',
      message: 'What is project id?',
      default: 'app01'
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is page name?',
      default: 'login',
      validate: value => {
        if (/.+/.test(value)) {
          return pageExists(value)
            ? 'A page name with this page name already exists'
            : true;
        }

        return 'The page name is required';
      }
    },
    {
      type: 'input',
      name: 'uri',
      message: 'What is uri path?',
      default: '/'
    }
  ],
  actions: data => {
    // Generate index.js
    const actions = [
      {
        type: 'add',
        path: '../frontend-app/src/pages/{{name}}/index.js',
        templateFile: './frontend/pages/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../frontend-app/src/pages/{{name}}/schema.json',
        templateFile: './frontend/pages/schema.json.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../frontend-app/src/pages/{{name}}/uischema.json',
        templateFile: './frontend/pages/uischema.json.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../frontend-app/src/pages/{{name}}/data.json',
        templateFile: './frontend/pages/data.json.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../frontend-app/src/App.js',
        templateFile: './frontend/App.js.hbs',
        abortOnFail: true
      },
      {
        type: "append",
        path: "../frontend-app/src/App.js",
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{pascalCase name}}Page from './pages/{{name}}';`
      },
      {
        type: "append",
        path: "../frontend-app/src/App.js",
        pattern: `{/* inject route */}`,
        template: `<Route path="{{uri}}" element={<{{pascalCase name}}Page />} />`
      }
    ];

    actions.push({
    type: 'prettify',
    path: '/frontend/',
  });

    return actions;
  }

  
};
