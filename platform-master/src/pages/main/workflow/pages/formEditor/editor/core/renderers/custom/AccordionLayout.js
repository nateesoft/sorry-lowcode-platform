import React, { memo } from "react"
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Hidden,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { withJsonFormsLayoutProps } from "@jsonforms/react"
import { rankWith, uiTypeIs } from "@jsonforms/core"

const AccordionLayoutRenderer = (props) => {
  const { visible } = props

  return (
    <Hidden xsUp={!visible}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Accordion Actions
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion>
    </Hidden>
  )
}

const customComparator = (prevProps, nextProps) => {
  return nextProps.schema === prevProps.schema
}

export const accordionLayoutTester = rankWith(1000, uiTypeIs("AccordionLayout"))
export default withJsonFormsLayoutProps(memo(AccordionLayoutRenderer, customComparator))
