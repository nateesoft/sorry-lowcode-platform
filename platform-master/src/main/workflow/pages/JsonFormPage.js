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
  if(haveData) {
    return JSON.stringify(haveData)
  }

  return JSON.stringify(temp)
}

function JsonFormPage(props) {
  const { id, onClose } = props;
  const [schemaData, setSchemaData] = useState(localLoad(id+"_template_schema", schema))
  const [uiSchemaData, setUISchemaData] = useState(localLoad(id+"_template_uischema", uischema))
  const [dataForm, setDataForm] = useState(localLoad(id+"_template_mock", data))
  const editorRef = useRef(null);

  const [value, setValue] = useState("1")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    editor.getAction("editor.action.formatDocument")?.run()
  }

  function handleEditorValidation(markers) {
    markers.forEach((marker) => console.log('onValidate:', marker.message));
  }

  function handleCloseModal() {
    onClose();
  }

  function handleSave() {
    localStorage.setItem(id+"_template_schema", schemaData)
    localStorage.setItem(id+"_template_uischema", uiSchemaData)
    localStorage.setItem(id+"_template_mock", dataForm)
    onClose();
  }

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Grid container padding={2} direction="column" alignItems="flex-end">
        <Grid item xs={12}>
          <Typography variant="span">Login Form Page</Typography>
        </Grid>
      </Grid>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="Demo" value="1" />
            <Tab label="Schema" value="2" />
            <Tab label="UI Schema" value="3" />
            <Tab label="Data" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <JsonForms
            schema={JSON.parse(schemaData)}
            uischema={JSON.parse(uiSchemaData)}
            data={JSON.parse(dataForm)}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data, _errors }) => setDataForm(JSON.stringify(data))}
          />
        </TabPanel>
        <TabPanel value="2">
          <Editor
            height="50vh"
            defaultLanguage="json"
            theme="vs-dark"
            value={schemaData}
            onChange={(value, event) => setSchemaData(value)}
            onMount={handleEditorDidMount}
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
            value={uiSchemaData}
            onChange={(value, event) => setUISchemaData(value)}
            onMount={handleEditorDidMount}
            onValidate={handleEditorValidation}
            options={{
              formatOnPaste: true
            }}
          />
        </TabPanel>
        <TabPanel value="4">
          <Editor
            height="50vh"
            defaultLanguage="json"
            theme="vs-dark"
            value={dataForm}
            onChange={(value, event) => setDataForm(value)}
            onMount={handleEditorDidMount}
            onValidate={handleEditorValidation}
            options={{
              formatOnPaste: true
            }}
          />
        </TabPanel>
      </TabContext>
      <Stack spacing={1} direction="row" padding={2} sx={{justifyContent: "flex-end"}}>
          <Button variant="contained" onClick={handleSave}>Save Page</Button>
          <Button variant="contained" onClick={handleCloseModal} color="error">Close</Button>
      </Stack>
    </Box>
  )
}

export default JsonFormPage
