import React, { useState } from "react"
import {
  FormControlLabel,
  IconButton,
  Switch,
  Toolbar
} from "@mui/material"
import {EditLocationRounded,FileCopyOutlined} from "@mui/icons-material"

import { ErrorDialog } from "../../core/components/ErrorDialog"
import { copyToClipBoard } from "../../core/util/clipboard"
import { env } from "../../env"
import { JsonEditorDialog } from "../../text-editor"

export const SchemaJson = ({
  title,
  schema,
  debugSchema,
  type,
  updateSchema
}) => {
  const [showSchemaEditor, setShowSchemaEditor] = useState(false)
  const [updateErrorText, setUpdateErrorText] = useState("")
  const showDebugControls = debugSchema && env().DEBUG === "true"
  const [showDebugSchema, setShowDebugSchema] = useState(!!showDebugControls)
  const showErrorDialog = Boolean(updateErrorText)
  const onApply = newSchema => {
    const updateResult = updateSchema(newSchema)
    if (updateResult.success) {
      setShowSchemaEditor(false)
      return
    }
    setUpdateErrorText(updateResult.message)
  }
  return (
    <>
      <Toolbar>
        <IconButton
          onClick={() =>
            copyToClipBoard(
              showDebugSchema && debugSchema ? debugSchema : schema
            )
          }
          data-cy="copy-clipboard"
        >
          <FileCopyOutlined />
        </IconButton>
        <IconButton
          onClick={() => setShowSchemaEditor(true)}
          data-cy="edit-schema"
        >
          <EditLocationRounded />
        </IconButton>
        {showDebugControls ? (
          <FormControlLabel
            control={
              <Switch
                data-cy="debug-toggle"
                checked={showDebugSchema}
                onChange={() => setShowDebugSchema(showDebug => !showDebug)}
                color="primary"
              />
            }
            label="Debug"
          />
        ) : null}
      </Toolbar>
      <pre data-cy="schema-text">{showDebugSchema ? debugSchema : schema}</pre>
      {showSchemaEditor && (
        <JsonEditorDialog
          open
          title={title}
          initialContent={schema}
          type={type}
          onCancel={() => setShowSchemaEditor(false)}
          onApply={onApply}
        />
      )}
      {showErrorDialog && (
        <ErrorDialog
          open
          title="Update Error"
          text={updateErrorText}
          onClose={() => setUpdateErrorText("")}
        />
      )}
    </>
  )
}
