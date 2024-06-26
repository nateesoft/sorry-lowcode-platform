import React from "react"
import { Button } from "@mui/material"
import { JsonFormsDispatch } from "@jsonforms/react"
import { useNavigate } from "react-router-dom"

import { setDefaultVal } from "../../utils"

const ActionButton = (props) => {
  const navigate = useNavigate()
  const {
    uischema,
    schema,
    path,
    enabled,
    renderers,
    cells,
    handleChange
  } = props
  const elements = setDefaultVal(uischema.elements, [])
  const options = setDefaultVal(uischema.options, {})
  const style = setDefaultVal(options.style, "")

  const handleClick = () => {
    const onClick = setDefaultVal(options.onclick, {})
    if (onClick) {
      const { route, clearForm } = onClick
      if (route) {
        if (route.type && route.type === "link") {
          console.log(props)
          navigate(route.uri)
        } else if (route.type && route.type === "service") {
          navigate(route.uri)
        }
      }
      if (clearForm) {
        handleChange("username", "")
        handleChange("password", "")
      }
    }
  }

  return (
    <Button {...style} onClick={handleClick}>
      {elements.map((child, index) => (
        <JsonFormsDispatch
          key={index}
          uischema={child}
          schema={schema}
          path={path}
          enabled={enabled}
          renderers={renderers}
          cells={cells}
        />
      ))}
    </Button>
  )
}

export default ActionButton
