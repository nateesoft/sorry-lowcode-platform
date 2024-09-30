import React, { useCallback, useState } from "react"
import { rankWith, scopeEndsWith } from "@jsonforms/core"
import { withJsonFormsControlProps } from "@jsonforms/react"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormHelperText,
  Grid,
  Typography
} from "@mui/material"
import {makeStyles} from "@mui/styles"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import MonacoEditor from "@monaco-editor/react"
import { spacing } from '@mui/system'

import { ShowMoreLess } from "../../core/components"

const invalidJsonMessage = "Not a valid rule JSON."
const ruleDescription =
  "Define conditions and effects that can dynamically control features of the UI based on data."

const ruleExample = (
  <div>
    <h3>Example</h3>
    <p>
      A rule that hides the UI Element it is contained in, when the value of the
      control with the scope <b>'#/properties/name'</b> is <b>'foo'</b>:
    </p>
    <pre>
      {JSON.stringify(
        {
          effect: "HIDE",
          condition: {
            type: "LEAF",
            scope: "#/properties/name",
            expectedValue: "foo"
          }
        },
        null,
        2
      )}
    </pre>
    <p>
      Visit the{"  "}
      <a href="https://jsonforms.io/docs/uischema/rules">
        JSON Forms documentation
      </a>{" "}
      for more info.
    </p>
  </div>
)
const isValidRule = rule => {
  return !rule || (rule.effect && rule.condition)
}

const useStyles = makeStyles(theme => ({
  editorRoot: {
    width: "100%"
  },
  showMore: {
    paddingBottom: spacing(2)
  }
}))
const RuleEditor = props => {
  const { data, path, handleChange, errors } = props
  const [invalidJson, setInvalidJson] = useState(false)
  const [dataModel, setDataModel] = useState(data)

  const onSubmitRule = useCallback(() => {
    try {
      const value = dataModel
      const rule = value ? JSON.parse(value) : undefined
      if (isValidRule(rule)) {
        setInvalidJson(false)
        handleChange(path, rule)
      } else {
        setInvalidJson(true)
      }
    } catch (error) {
      setInvalidJson(true)
    }
  }, [handleChange, dataModel, path])

  const isValid = errors.length === 0 && !invalidJson
  const classes = useStyles()
  return (
    <Accordion defaultExpanded={!!data}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Rule</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className={classes.editorRoot}>
          <FormHelperText error={false}>{ruleDescription}</FormHelperText>
          <ShowMoreLess className={classes.showMore}>
            <FormHelperText error={false}>{ruleExample}</FormHelperText>
          </ShowMoreLess>

          <MonacoEditor
            defaultLanguage="json"
            defaultValue={dataModel}
            onChange={(editor)=>{
              setDataModel(editor)
            }}
            height={200}
            options={{
              formatOnPaste: true,
              formatOnType: true,
              automaticLayout: true
            }}
          />
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item>
              <Button variant="contained" onClick={onSubmitRule}>
                Apply
              </Button>
            </Grid>
            <Grid item>
              <FormHelperText error={true} hidden={isValid}>
                {errors.length !== 0 ? errors : invalidJsonMessage}
              </FormHelperText>
            </Grid>
          </Grid>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

const RuleEditorRenderer = RuleEditor
export const RuleEditorRendererRegistration = {
  tester: rankWith(100, scopeEndsWith("rule")),
  renderer: withJsonFormsControlProps(RuleEditorRenderer)
}
