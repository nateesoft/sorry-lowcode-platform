/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');
const pageSource = fs.readdirSync(
  path.join(__dirname, '../../frontend-app/src/pages'),
);

function pageExists(comp) {
  return pageSource.indexOf(comp) >= 0;
}

module.exports = pageExists;
