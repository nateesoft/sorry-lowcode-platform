import React, { useState, useRef, memo } from "react"
import { Box, Grid, Typography } from "@mui/material"
import Editor from "@monaco-editor/react"

const PropertieEditor = memo(({language}) => {
  const editorRef = useRef(null)
  const [data, setData] = useState("")


  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor
    setTimeout(function () {
      editor.getAction("editor.action.formatDocument").run()
    }, 300)
  }

  return (
    <Grid container>
      <Grid item xs={6}>
        <Editor
          height="70vh"
          defaultLanguage={language}
          theme="vs-light"
          value={data}
          onChange={(value, event) => setData(value)}
          onMount={handleEditorDidMount}
          options={{
            formatOnPaste: true
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <Box>
          <Typography variant="span">Component Name: </Typography>
          <Typography variant="span">Payload</Typography>
        </Box>
        <Box>
          <Typography variant="span">Component Type: </Typography>
          <Typography variant="span">Input/Output</Typography>
        </Box>
        <Box>
          <Typography variant="span">Next Component: </Typography>
          <Typography variant="span">Decision</Typography>
        </Box>
        <Box>
          <Typography variant="span">Back Component: </Typography>
          <Typography variant="span">{"<none>"}</Typography>
        </Box>
      </Grid>
    </Grid>
  )
})

export default PropertieEditor
