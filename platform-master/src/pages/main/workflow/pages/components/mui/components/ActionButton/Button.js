import React from "react"
import { Button } from "@mui/material"

import {setDefaultVal} from '../../utils'

const ActionButton = (props) => {
  const { uischema } = props
  // const elements = setDefaultVal(uischema.elements, [])
  const options = setDefaultVal(uischema.options, {})
  const style = setDefaultVal(options.style, "")

  return <Button {...style}>{props.label}</Button>
}

export default ActionButton
