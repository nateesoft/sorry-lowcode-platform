import React, { useState } from "react"
import { Tab, Tabs } from "@mui/material"
import {makeStyles} from "@mui/styles"

import { TabContent } from "../../core/components"
import { Editor } from "./Editor"

const useStyles = makeStyles(() => ({
  editorPanel: {
    height: "100%",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto 1fr "
  }
}))

export const EditorPanel = ({ editorTabs, editorRenderers }) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }
  const classes = useStyles()
  return (
    <div className={classes.editorPanel}>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Editor" />
        {editorTabs
          ? editorTabs.map(tab => (
              <Tab key={`tab-${tab.name}`} label={tab.name} />
            ))
          : null}
      </Tabs>
      <TabContent index={0} currentIndex={selectedTab}>
        <Editor editorRenderers={editorRenderers} />
      </TabContent>
      {editorTabs
        ? editorTabs.map((tab, index) => (
            <TabContent
              key={`content-${index + 1}`}
              index={index + 1}
              currentIndex={selectedTab}
            >
              <tab.Component />
            </TabContent>
          ))
        : null}
    </div>
  )
}
