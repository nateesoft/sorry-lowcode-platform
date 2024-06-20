import React, { useState, useRef, useCallback, useEffect } from "react"
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  MarkerType,
  Panel
} from "reactflow"

import "reactflow/dist/style.css"

import LeftMenu from "./LeftMenu"
import StartNode from "./nodes/StartNode"
import ProcessNode from "./nodes/ProcessNode"
import PayloadNode from "./nodes/PayloadNode"
import QueryNode from "./nodes/QueryNode"
import MappingNode from "./nodes/MappingNode"
import ResponseNode from "./nodes/ResponseNode"
import EndNode from "./nodes/EndNode"

import "./index.css"
import { Button, Grid } from "@mui/material"

const logicFlowKey = "logicTemplate"

const nodeTypes = {
  start: StartNode,
  payload: PayloadNode,
  query: QueryNode,
  mapping: MappingNode,
  response: ResponseNode,
  process: ProcessNode,
  end: EndNode
}

const LogicFlow = (props) => {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            label: "connected",
            markerEnd: { type: MarkerType.Arrow }
          },
          eds
        )
      ),
    [setEdges]
  )

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const type = event.dataTransfer.getData("application/reactflow")
      if (typeof type === "undefined" || !type) {
        return
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      })

      let label = ""
      if (type === "start") {
        label = "Start"
      } else if (type === "payload") {
        label = "Payload"
      } else if (type === "query") {
        label = "Query"
      } else if (type === "mapping") {
        label = "Mapping"
      } else if (type === "response") {
        label = "Response"
      } else if (type === "process") {
        label = "Process"
      } else if (type === "end") {
        label = "End"
      }

      const newNode = {
        id: `node_${Math.random().toString(36).substring(2, 8)}`,
        type,
        position,
        data: { label },
        style: {
          width: 80,
          height: 50
        }
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes]
  )

  const onNodeClick = () => {
    nodes.forEach((node) => {
      if (node.selected) {
        // setProperty({
        //   id: node.id,
        //   label: node.data.label,
        //   type: node.type,
        //   component: "node"
        // })
      }
    })
  }

  const onEdgeClick = () => {
    edges.forEach((edge) => {
      if (edge.selected) {
        // setProperty({
        //   id: edge.id,
        //   label: edge.label,
        //   type: edge.type,
        //   component: "edge"
        // })
      }
    })
  }

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject()
      localStorage.setItem(logicFlowKey, JSON.stringify(flow))
    }
  }, [reactFlowInstance])

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(logicFlowKey))
      if (flow) {
        setNodes(flow.nodes || [])
        setEdges(flow.edges || [])
      }
    }

    restoreFlow()
  }, [setNodes, setEdges])

  useEffect(() => {
    onRestore()
  }, [onRestore])

  return (
    <div className="dndflow">
      <LeftMenu />
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          ref={reactFlowWrapper}
          style={{ height: "100vh" }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Panel position="top-right">
              <Grid container spacing={1}>
                <Grid item>
                  <Button variant="contained" color="info" onClick={onSave}>
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    Click={onRestore}
                    sx={{
                      bgcolor: "snow",
                      color: "black",
                      ":hover": {
                        bgcolor: "#eee"
                      }
                    }}
                  >
                    Restore
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={props.onClose}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
            </Panel>
            <Controls />
            <MiniMap zoomable pannable />
            <Background />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  )
}

export default LogicFlow
