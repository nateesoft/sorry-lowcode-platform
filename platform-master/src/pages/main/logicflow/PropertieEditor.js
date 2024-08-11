import React, { useState, useRef } from 'react';
import { Grid } from '@mui/material';
import Editor from "@monaco-editor/react"

const PropertieEditor = (props) => {
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
                    defaultLanguage="javascript"
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
                RIGHT PANEL
            </Grid>
        </Grid>
    )
}

export default PropertieEditor