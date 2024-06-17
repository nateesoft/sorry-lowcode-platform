/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const addRouteGenerator = require("./frontend/addRoute")

/**
 * Every generated backup file gets this extension
 * @type {string}
 */

module.exports = plop => {
  plop.setGenerator("addRoute", addRouteGenerator)
}
