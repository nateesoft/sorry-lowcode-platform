import React from "react"
import { rankWith, uiTypeIs } from "@jsonforms/core"
import { withJsonFormsLayoutProps } from "@jsonforms/react"
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography
} from "@mui/material"
import {makeStyles} from "@mui/styles"
import { spacing } from '@mui/system'

import { DroppableLayout } from "./DroppableLayout"

const useStyles = makeStyles(theme => ({
  groupLabel: {
    padding: spacing(2),
    alignItems: "baseline"
  },
  labelPlaceholder: {
    fontStyle: "italic",
    fontWeight: "lighter",
    color: "#9e9e9e"
  },
  groupLabelInput: {
    fontSize: "24px"
  }
}))

const Group = props => {
  const { uischema } = props
  const groupLayout = uischema
  const classes = useStyles()
  return (
    <Card>
      <CardHeader
        component={() => (
          <Grid
            container
            direction="row"
            spacing={1}
            className={classes.groupLabel}
          >
            <Grid item>
              <Typography>Label:</Typography>
            </Grid>
            <Grid item>
              <Typography
                className={`${
                  groupLayout.label ? "" : classes.labelPlaceholder
                }`}
                variant="h6"
              >
                {groupLayout.label ?? "no label"}
              </Typography>
            </Grid>
          </Grid>
        )}
      ></CardHeader>
      <CardContent>
        <DroppableLayout {...props} layout={groupLayout} direction={"column"} />
      </CardContent>
    </Card>
  )
}

export const DroppableGroupLayoutRegistration = {
  tester: rankWith(45, uiTypeIs("Group")),
  renderer: withJsonFormsLayoutProps(Group)
}
