import React, { memo } from "react"

const LeftMenu = memo(() => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <aside>
      <div className="description">Logic Flow</div>
      <div
        className="dndnode"
        style={{height: "65px"}}
        onDragStart={(event) => onDragStart(event, "start")}
        draggable
      >
        Start
      </div>
      <div
        className="dndnode"
        style={{height: "80px"}}
        onDragStart={(event) => onDragStart(event, "payload")}
        draggable
      >
        Payload
      </div>
      <div
        className="dndnode"
        style={{height: "80px"}}
        onDragStart={(event) => onDragStart(event, "process")}
        draggable
      >
        Process
      </div>
      <div
        className="dndnode"
        style={{height: "80px"}}
        onDragStart={(event) => onDragStart(event, "query")}
        draggable
      >
        Query
      </div>
      <div
        className="dndnode"
        style={{height: "80px"}}
        onDragStart={(event) => onDragStart(event, "mapping")}
        draggable
      >
        Mapping
      </div>
      <div
        className="dndnode"
        style={{height: "80px"}}
        onDragStart={(event) => onDragStart(event, "response")}
        draggable
      >
        Response
      </div>
      <div
        className="dndnode"
        style={{height: "65px"}}
        onDragStart={(event) => onDragStart(event, "end")}
        draggable
      >
        End
      </div>
    </aside>
  )
})

export default LeftMenu
