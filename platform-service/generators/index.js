/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const pageGenerator = require("./frontend")

/**
 * Every generated backup file gets this extension
 * @type {string}
 */

module.exports = (plop) => {
  plop.setGenerator("frontend", pageGenerator)
}
