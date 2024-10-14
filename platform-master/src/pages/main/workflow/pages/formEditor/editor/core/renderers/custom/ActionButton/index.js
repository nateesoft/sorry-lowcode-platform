import React, { useState, memo } from "react"
import { rankWith, uiTypeIs } from "@jsonforms/core"
import { Button } from "@mui/material"
import { withJsonFormsControlProps } from "@jsonforms/react"
import { materialCells } from "@jsonforms/material-renderers"
import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { JsonForms } from "@jsonforms/react"

import { DroppableLayout } from "../../DroppableLayout"
import { setDefaultVal } from "../../../../../../components/mui/utils"

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "snow",
  border: "1px solid #000",
  boxShadow: 24,
  width: "90%",
  height: "80vh",
  margin: "5px",
  p: 4
}

const ActionButton = (props) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  const navigate = useNavigate()
  const { uischema, renderers, handleChange } =
    props
  const options = setDefaultVal(uischema.options, {})
  const style = setDefaultVal(options.style, "")

  // for onClick
  const onClick = setDefaultVal(options.onclick, {})
  const data = setDefaultVal(onClick.data, {})
  const modalSchema = setDefaultVal(onClick.modalSchema, {})

  const handleClick = () => {
    if (onClick) {
      const { route, clearForm, modal } = onClick
      if(modal) {
        setOpen(true)
      } else {
        if (route) {
          if (route.type && route.type === "link") {
            navigate(route.uri)
          } else if (route.type && route.type === "service") {
            navigate(route.uri)
          }
        } else if (clearForm) {
          handleChange("username", "")
          handleChange("password", "")
        }
      }
    }
  }

  return (
    <>
      <Button {...style} onClick={() => handleClick()}>
        <DroppableLayout {...props} layout={uischema} direction={"row"} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <JsonForms
            schema={modalSchema.schema}
            uischema={modalSchema.uischema}
            data={data}
            renderers={renderers}
            cells={materialCells}
          />
        </Box>
      </Modal>
    </>
  )
}

export const actionButtonTester = rankWith(40, uiTypeIs("ActionButton"))

const customComparator = (prevProps, nextProps) => {
  return nextProps.schema === prevProps.schema
}

export default withJsonFormsControlProps(memo(ActionButton, customComparator))
