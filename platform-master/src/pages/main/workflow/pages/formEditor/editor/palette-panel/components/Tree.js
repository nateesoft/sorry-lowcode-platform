import React from "react"
import { createStyles, styled } from "@mui/material"
import {withStyles} from '@mui/styles'
import {CollectionsSharp} from "@mui/icons-material"
import {TreeItem, SimpleTreeView} from '@mui/x-tree-view'
import { animated, useSpring } from "react-spring" // web.cjs is required for IE 11 support
import { spacing } from '@mui/system'

const PaletteTransitionComponent = props => {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: "translate3d(20px,0,0)",
      filter: "blur(0)"
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
      filter: "blur(0)"
    }
  })
  return (
    <animated.div style={style}>
      <CollectionsSharp {...props} />
    </animated.div>
  )
}

export const StyledTreeView = styled(SimpleTreeView)({ flexGrow: 1, maxWidth: 400 })

const treeItemStyles = theme =>
  createStyles({
    root: props => ({
      opacity: props.isDragging ? 0.5 : 1
    }),
    iconContainer: {
      "& .close": {
        opacity: 0.3
      }
    },
    group: {
      marginLeft: spacing(1),
      paddingLeft: spacing(2),
      borderLeft: `1px dashed`
    }
  })

export const StyledTreeItem = withStyles(
  treeItemStyles
)(({ isDragging, ...props }) => (
  <TreeItem {...props} TransitionComponent={PaletteTransitionComponent} />
))
