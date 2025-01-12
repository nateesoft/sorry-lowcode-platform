import { Grid2 } from "@mui/material"
import React, { memo } from "react"

const LeftMenu = memo(() => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <aside>
      <div className="description">Service Flow</div>
      <Grid2 container spacing={1} justifyContent="center">
        <div className="dndnode"
          style={{ height: "80px", width: "80px", borderRadius: "50%" }}
          onDragStart={(event) => onDragStart(event, "start")}
          draggable>
          Start
        </div>
        <div
          className="dndnode"
          style={{ width: "100px", height: "55px", transform: "skew(20deg)", fontSize: "16px" }}
          onDragStart={(event) => onDragStart(event, "payload")}
          draggable>
          Payload
        </div>
        <div
          className="dndnode"
          style={{ width: "100px", height: "55px", transform: "skew(20deg)", fontSize: "16px" }}
          onDragStart={(event) => onDragStart(event, "response")}
          draggable>
          Response
        </div>
        <div
          className="dndnode"
          style={{
            width: "65px",
            height: "65px",
            transform: "rotate(-45deg)",
            fontSize: "12px"
          }}
          onDragStart={(event) => onDragStart(event, "decision")}
          draggable>
          Decision
        </div>
        <div
          className="dndnode"
          style={{ height: "50px", top: "20px", fontSize: "16px" }}
          onDragStart={(event) => onDragStart(event, "process")}
          draggable>
          Process
        </div>
        <div
          className="dndnode"
          style={{ height: "80px", width: "80px", borderRadius: "50%", top: "20px" }}
          onDragStart={(event) => onDragStart(event, "end")}
          draggable>
          End
        </div>
      </Grid2>
    </aside>
  )
})

export default LeftMenu
