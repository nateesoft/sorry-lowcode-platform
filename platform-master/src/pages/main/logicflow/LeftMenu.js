import { Grid } from "@mui/material"
import React, { memo } from "react"

const LeftMenu = memo(() => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <aside>
      <div className="description" style={{ color: "#aaa"}}>Logic Flow</div>
      <Grid container spacing={1}>
        <Grid item xs>
          <div className="dndnode"
            style={{ position: "relative", height: "65px", width: "65px", borderRadius: "50%", fontSize: '18px', left: "25px" }}
            onDragStart={(event) => onDragStart(event, "start")}
            draggable>
            Start
          </div>
        </Grid>
        <Grid item xs>
          <div
            className="dndnode"
            style={{ position: "relative", width: "90px", height: "55px", transform: "skew(20deg)", fontSize: '14px', left: "10px" }}
            onDragStart={(event) => onDragStart(event, "inputOutput")}
            draggable
          >
            Input/Output
          </div>
        </Grid>
        <Grid item xs>
          <div
            className="dndnode"
            style={{
              position: "relative",
              width: "50px",
              height: "50px",
              left: "60px",
              transform: "rotate(-45deg)",
              transformOrigin: "0 100%",
              top: "20px",
              fontSize: "10px"
            }}
            onDragStart={(event) => onDragStart(event, "decision")}
            draggable
          >
            Decision
          </div>
        </Grid>
        <Grid item xs>
          <div
            className="dndnode"
            style={{ height: "50px", top: "20px", position: "relative", fontSize: '18px' }}
            onDragStart={(event) => onDragStart(event, "process")}
            draggable
          >
            Process
          </div>
        </Grid>
        <Grid item xs>
          <div
            className="dndnode"
            style={{ left: "25px", height: "65px", width: "65px", borderRadius: "50%", top: "20px", position: "relative", fontSize: '18px' }}
            onDragStart={(event) => onDragStart(event, "end")}
            draggable
          >
            End
          </div>
        </Grid>
      </Grid>
    </aside>
  )
})

export default LeftMenu
