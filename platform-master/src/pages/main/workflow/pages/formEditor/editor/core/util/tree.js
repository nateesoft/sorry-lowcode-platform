/**
 * Returns an array starting with the current element followed by its parents
 */
export const getHierarchy = element =>
  !element ? [] : [element, ...getHierarchy(element.parent)]
