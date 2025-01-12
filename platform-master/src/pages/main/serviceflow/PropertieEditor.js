import React, { useState, useRef, memo, useEffect } from "react"
import { Box, Grid, Grid2, Typography } from "@mui/material"
import Editor from "@monaco-editor/react"

const PropertieEditor = memo(({ language, setContent, content, props }) => {
  console.log('PropertieEditor:', props)
  const editorRef = useRef(null)
  const [data, setData] = useState(content)
  const { data: propData } = props

  useEffect(() => {
    console.log('PropertieEditor(useEffect):', language)
  }, [language])

  function handleContent(content) {
    setData(content)
    setContent(content)
  }

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor
    setTimeout(function () {
      editor.getAction("editor.action.formatDocument").run()
    }, 300)
  }

  return (
    <div>
      <Box display="flex" flexDirection="row">
        <Editor
          height="70vh"
          width="70vw"
          defaultLanguage={language}
          theme="vs-light"
          value={data}
          onChange={(value, event) => handleContent(value)}
          onMount={handleEditorDidMount}
          options={{
            formatOnPaste: true
          }}
        />
        <Grid2 container spacing={1} direction="column" padding={1}>
          <Typography variant="span">Component Name: {propData.label}</Typography>
          <Typography variant="span">Component Type: {propData.type}</Typography>
          <Typography variant="span">Next Component: </Typography>
          {propData && propData.nextProcess && propData.nextProcess.map((item =>
            <Typography variant="span" sx={{ margin: "5px" }}>{item.target}</Typography>
          ))}
        </Grid2>
      </Box>
    </div>
  )
})

export default PropertieEditor
