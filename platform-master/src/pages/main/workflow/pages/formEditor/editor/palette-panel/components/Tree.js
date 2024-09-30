import React from "react"
import { styled } from "@mui/material"
import {TreeItem, SimpleTreeView} from '@mui/x-tree-view'

export const StyledTreeView = styled(SimpleTreeView)({ flexGrow: 1, maxWidth: 400 })
export const StyledTreeItem = (({ isDragging, ...props }) => {
  return (
    <React.Fragment>
      <TreeItem {...props} ContentProps={props} />
    </React.Fragment>
  )
})
