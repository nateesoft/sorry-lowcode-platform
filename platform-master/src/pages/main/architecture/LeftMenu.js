import React, { memo } from "react"
import { Link as RouterLink } from "react-router-dom"
import Link from "@mui/material/Link"

const LeftMenu = memo(() => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <aside>
      <div className="description">
        <Link component={RouterLink} to="/workflows">
          Architecture Overview
        </Link>
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "user")}
        draggable
      >
        <img src="/images/user.png" alt="" />
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "frontend")}
        draggable
      >
        <img src="/images/frontend.png" alt="" />
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "backend")}
        draggable
      >
        <img src="/images/backend.png" alt="" />
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
        onDragStart={(event) => onDragStart(event, "message")}
        draggable
      >
        <img src="/images/message.png" alt="" />
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "report")}
        draggable
      >
        <img src="/images/export_report.png" alt="" />
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "auditlogs")}
        draggable
      >
        <img src="/images/audit_logs.png" alt="" />
      </div>
    </aside>
  )
})

export default LeftMenu
