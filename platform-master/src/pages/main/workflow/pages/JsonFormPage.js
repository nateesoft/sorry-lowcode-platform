import React, { useState, useRef, useEffect } from "react"
import { materialCells } from "@jsonforms/material-renderers"
import { JsonForms } from "@jsonforms/react"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import Editor from "@monaco-editor/react"
import { Button, Grid, Stack, Typography, Paper } from "@mui/material"

import { renderers } from "./components/renderers"
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
  const { id, label, onClose } = props

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
  const [valuePreview, setValuePreview] = useState("1")

  const validJsonSchema = (obj, data, callFunc) => {
    const p1 = new Promise((resolve, reject) => {
      let count = 0
      Object.keys(obj).forEach((item) => {
        const obj1 = obj[item]
        if (
          item === "type" &&
          [
            "string",
            "number",
            "integer",
            "object",
            "array",
            "boolean",
            "null"
          ].indexOf(obj1) === -1
        ) {
          count = count + 1
          return;
        }
        if (obj1 instanceof Object) {
          validJsonSchema(obj1)
        }
      })

      resolve(count)
    })

    p1.then((result) => {
      console.log("in promise:", result)
      if (undefined === result) {
        console.log("schema:change")
        callFunc(data)
      } else {
        console.log('schema:failure')
      }
    })
  }

  const handleSave = async (data, callFunc, type) => {
    try {
      const obj = JSON.parse(data)
      if ("schema" === type) {
        // callFunc(data)
        validJsonSchema(obj, data, callFunc)
      } else {
        callFunc(data)
      }
    } catch (e) {
      // console.error(e)
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handlePreviewChange = (event, newValue) => {
    setValuePreview(newValue)
  }

  function handleEditorDidMount1(editor, monaco) {
    editorRef1.current = editor
    setTimeout(function () {
      editor.getAction("editor.action.formatDocument").run()
    }, 300)
  }
  function handleEditorDidMount2(editor, monaco) {
    editorRef2.current = editor
    setTimeout(function () {
      editor.getAction("editor.action.formatDocument").run()
    }, 300)
  }
  function handleEditorDidMount3(editor, monaco) {
    editorRef3.current = editor
    setTimeout(function () {
      editor.getAction("editor.action.formatDocument").run()
    }, 300)
  }

  function handleEditorValidation(markers) {
    setInvalidMsg("")
    markers.forEach((marker) => {
      setInvalidMsg("onValidate:" + marker.message)
    })
  }

  function handleEditorValidationSchema(markers) {
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

  useEffect(() => {
    console.log("JsonFormPage load")
  }, [])

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
            <Typography variant="h6">{label}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={valuePreview}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handlePreviewChange}>
                <Tab label="Palette" value="1" />
                <Tab label="Preview" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <h1>Palette Tools</h1>
            </TabPanel>
            <TabPanel value="2">
              <Paper  sx={{ height: '70vh', padding: '10px', overflow: 'auto' }}>
                <JsonForms
                  schema={JSON.parse(schemaData)}
                  uischema={JSON.parse(uiSchemaData)}
                  data={JSON.parse(dataForm)}
                  renderers={renderers}
                  cells={materialCells}
                />
              </Paper>
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="UI Editor" value="1" />
              <Tab label="UI Schema" value="2" />
              <Tab label="Schema" value="3" />
              <Tab label="Data" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <h1>UI Editor</h1>
          </TabPanel>
          <TabPanel value="2">
            <Editor
              height="70vh"
              defaultLanguage="json"
              theme="vs-dark"
              value={uiSchemaData}
              onChange={(value, event) =>
                handleSave(value, setUISchemaData, "uischema")
              }
              onMount={handleEditorDidMount1}
              onValidate={handleEditorValidation}
              options={{
                formatOnPaste: true
              }}
            />
          </TabPanel>
          <TabPanel value="3">
            <Editor
              height="70vh"
              defaultLanguage="json"
              theme="vs-dark"
              value={schemaData}
              onChange={(value, event) =>
                handleSave(value, setSchemaData, "schema")
              }
              onMount={handleEditorDidMount2}
              onValidate={handleEditorValidationSchema}
              options={{
                formatOnPaste: true
              }}
            />
          </TabPanel>
          <TabPanel value="4">
            <Editor
              height="70vh"
              defaultLanguage="json"
              theme="vs-dark"
              value={dataForm}
              onChange={(value, event) =>
                handleSave(value, setDataForm, "data")
              }
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
          sx={{
            justifyContent: "flex-end",
            background: "#aed6f1",
            color: "white"
          }}
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
