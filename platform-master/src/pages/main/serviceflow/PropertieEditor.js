import React, { useState, useRef, memo, useEffect } from "react"
import { Box, Grid, Typography } from "@mui/material"
import Editor from "@monaco-editor/react"

const PropertieEditor = memo(({language, setContent, content, props}) => {
  console.log('PropertieEditor:', props)
  const editorRef = useRef(null)
  const [data, setData] = useState(content)
  const {data: propData} = props

  useEffect(()=> {
    console.log('PropertieEditor(useEffect):', language)
  }, [language])

  function handleContent (content) {
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
    <Grid container>
      <Grid item xs={6}>
        <Editor
          height="70vh"
          defaultLanguage={language}
          theme="vs-light"
          value={data}
          onChange={(value, event) => handleContent(value)}
          onMount={handleEditorDidMount}
          options={{
            formatOnPaste: true
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <Box>
          <Typography variant="span">Component Name: </Typography>
          <Typography variant="span">{propData.label}</Typography>
        </Box>
        <Box>
          <Typography variant="span">Component Type: </Typography>
          <Typography variant="span">{propData.type}</Typography>
        </Box>
        <Typography variant="span">Next Component: </Typography>
        {propData.nextProcess && propData.nextProcess.map((item=>
          <Box sx={{marginLeft: '10px'}}>
            <Typography variant="span">{item.target}</Typography>
          </Box>
        ))}
      </Grid>
    </Grid>
  )
})

export default PropertieEditor
