export const setDefaultVal = (value, defaultValue) => {
  return value === undefined ? defaultValue : value
}

export const getLabelValue = (label, data) => {
  if (label.startsWith("{")) {
    let objects = label.replace("{", "").replace("}", "").split(".")
    return data[objects[1]]
  }
  return label
}
