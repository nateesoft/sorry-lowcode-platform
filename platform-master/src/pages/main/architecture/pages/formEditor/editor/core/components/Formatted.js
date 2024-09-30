import React from "react"

export const FormattedJson = object => {
  return <pre>{JSON.stringify(object, null, 2)}</pre>
}
