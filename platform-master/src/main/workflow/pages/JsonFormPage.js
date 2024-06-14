import React, { useState, useRef } from "react"
import { materialRenderers, materialCells } from "@jsonforms/material-renderers"
import { JsonForms } from "@jsonforms/react"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import Editor from "@monaco-editor/react"
import { Button, Grid, Stack, Typography } from "@mui/material"

import uischema from "./uischema.json"
import schema from "./schema.json"
import data from "./data.json"

function localLoad(pageKey, temp) {
  const haveData = JSON.parse(localStorage.getItem(pageKey))
  if (haveData) {
    return JSON.stringify(haveData)
  }

  return JSON.stringify(temp)
}

function JsonFormPage(props) {
  const { id, onClose } = props

  const [invalidMsg, setInvalidMsg] = useState("")
  const [schemaData, setSchemaData] = useState(
    localLoad(id + "_template_schema", schema)
  )
  const [uiSchemaData, setUISchemaData] = useState(
    localLoad(id + "_template_uischema", uischema)
  )
  const [dataForm, setDataForm] = useState(
    localLoad(id + "_template_data", data)
  )

  const editorRef1 = useRef(null)
  const editorRef2 = useRef(null)
  const editorRef3 = useRef(null)
  const [value, setValue] = useState("1")

  const handleSave = (data, callFunc) => {
    try {
      JSON.parse(data)
      callFunc(data)
    } catch (e) {
      console.error(e)
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function handleEditorDidMount1(editor, monaco) {
    editorRef1.current = editor
    editor.getAction("editor.action.formatDocument")?.run()
  }
  function handleEditorDidMount2(editor, monaco) {
    editorRef2.current = editor
    editor.getAction("editor.action.formatDocument")?.run()
  }
  function handleEditorDidMount3(editor, monaco) {
    editorRef3.current = editor
    editor.getAction("editor.action.formatDocument")?.run()
  }

  function handleEditorValidation(markers) {
    setInvalidMsg("")
    markers.forEach((marker) => {
      setInvalidMsg("onValidate:" + marker.message)
    })
  }

  function handleCloseModal() {
    onClose()
  }

  function handleSaveLocalStorage() {
    localStorage.setItem(id + "_template_schema", schemaData)
    localStorage.setItem(id + "_template_uischema", uiSchemaData)
    localStorage.setItem(id + "_template_data", dataForm)
    onClose()
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid
          container
          padding={2}
          direction="column"
          alignItems="center"
          sx={{ background: "#228f17", color: "white" }}
        >
          <Grid item xs={12}>
            <Typography variant="h6">Login Form Page</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value="1">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange}>
                <Tab label="Demo" value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <JsonForms
                schema={JSON.parse(schemaData)}
                uischema={JSON.parse(uiSchemaData)}
                data={JSON.parse(dataForm)}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data, _errors }) =>
                  setDataForm(JSON.stringify(data))
                }
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="UI Schema" value="1" />
              <Tab label="Schema" value="2" />
              <Tab label="Data" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Editor
              height="50vh"
              defaultLanguage="json"
              theme="vs-dark"
              value={uiSchemaData}
              onChange={(value, event) => handleSave(value, setUISchemaData)}
              onMount={handleEditorDidMount1}
              onValidate={handleEditorValidation}
              options={{
                formatOnPaste: true
              }}
            />
          </TabPanel>
          <TabPanel value="2">
            <Editor
              height="50vh"
              defaultLanguage="json"
              theme="vs-dark"
              value={schemaData}
              onChange={(value, event) => handleSave(value, setSchemaData)}
              onMount={handleEditorDidMount2}
              onValidate={handleEditorValidation}
              options={{
                formatOnPaste: true
              }}
            />
          </TabPanel>
          <TabPanel value="3">
            <Editor
              height="50vh"
              defaultLanguage="json"
              theme="vs-dark"
              value={dataForm}
              onChange={(value, event) => handleSave(value, setDataForm)}
              onMount={handleEditorDidMount3}
              onValidate={handleEditorValidation}
              options={{
                formatOnPaste: true
              }}
            />
          </TabPanel>
        </TabContext>
      </Grid>
      {invalidMsg && (
        <Grid item xs={12}>
          <Grid
            container
            direction="column"
            alignItems="center"
            sx={{ background: "red", color: "white" }}
          >
            <Grid item xs={12}>
              <Typography variant="span">
                JSON invalid: [ {invalidMsg} ]
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12}>
        <Stack
          spacing={1}
          direction="row"
          padding={2}
          sx={{ justifyContent: "center" }}
        >
          <Button variant="contained" onClick={handleSaveLocalStorage}>
            Save Page
          </Button>
          <Button variant="contained" onClick={handleCloseModal} color="error">
            Close
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default JsonFormPage
