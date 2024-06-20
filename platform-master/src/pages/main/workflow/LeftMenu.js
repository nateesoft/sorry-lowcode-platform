import React, { memo } from "react"
// import { useParams } from 'react-router-dom';
import { Link as RouterLink } from "react-router-dom"
import Link from "@mui/material/Link"

const LeftMenu = memo(() => {
  // const { id } = useParams();

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <aside>
      <div className="description">
        <Link component={RouterLink} to="/workflows">
          Work Flow
        </Link>
      </div>
      <div
        className="flowchart"
        onDragStart={(event) => onDragStart(event, "actor")}
        draggable
      >
        <img src="/images/actor.png" alt="" />
      </div>
      <div
        className="dndnode start"
        onDragStart={(event) => onDragStart(event, "start")}
        draggable
      >
        Start
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "page")}
        draggable
      >
        <img src="/images/pages.png" alt="" />
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "message")}
        draggable
      >
        <img src="/images/message.png" alt="" />
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "database")}
        draggable
      >
        <img src="/images/database.png" alt="" />
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "server")}
        draggable
      >
        <img src="/images/server.png" alt="" />
      </div>
      <div
        className="dndnode end"
        onDragStart={(event) => onDragStart(event, "end")}
        draggable
      >
        End
      </div>
    </aside>
  )
})

export default LeftMenu
