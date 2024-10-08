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
import { useParams } from 'react-router';
import { Button, Grid, Typography } from "@mui/material"

import "reactflow/dist/style.css"

import LeftMenu from "./LeftMenu"
import PropertyPanel from "./PropertyPanel"

import StartNode from "./nodes/StartNode"
import ProcessNode from "./nodes/ProcessNode"
import PayloadNode from "./nodes/Payload"
import ResponseNode from "./nodes/Response"
import DecisionNode from "./nodes/DecisionNode"
import EndNode from "./nodes/EndNode"

import "./index.css"

const nodeTypes = {
  start: StartNode,
  payload: PayloadNode,
  response: ResponseNode,
  decision: DecisionNode,
  process: ProcessNode,
  end: EndNode
}

const ServiceFlow = (props) => {
  const { id: logicFlowKey } = useParams();
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [property, setProperty] = useState({})
  const [showPage, setShowPage] = useState({})

  console.log('ServiceFlow:', props);

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
      } else if (type === "response") {
        label = "Response"
      } else if (type === "decision") {
        label = "X"
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

  // const findNodeInEdges1 = (nodeId) => edges.filter((edge) => edge.source===nodeId)
  const findNodeInEdges = (nodeId) => edges.filter((edge) => {
    return edge.source===nodeId
  })

  const onNodeClick = () => {
    nodes.forEach((node) => {
      if (node.selected) {
        const nextProcess = findNodeInEdges(node.id)
        setProperty({
          id: node.id,
          label: node.data.label,
          type: node.type,
          component: "node",
          nextProcess
        })
      }
    })
  }

  const onEdgeClick = () => {
    edges.forEach((edge) => {
      if (edge.selected) {
        setProperty({
          id: edge.id,
          label: edge.label,
          type: edge.type,
          component: "edge"
        })
      }
    })
  }

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject()
      localStorage.setItem(logicFlowKey, JSON.stringify(flow))
    }
  }, [reactFlowInstance, logicFlowKey])

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(logicFlowKey))
      if (flow) {
        setNodes(flow.nodes || [])
        setEdges(flow.edges || [])
      }
    }

    restoreFlow()
  }, [setNodes, setEdges, logicFlowKey])

  const onPropertyChange = (props) => {
    if (props.component === "node") {
      nodes.forEach((node) => {
        if (node.selected) {
          const updNode = { ...node, data: { label: props.label } }
          setNodes((nds) => nds.concat(updNode))
        }
      })
    } else if (props.component === "edge") {
      edges.forEach((edge) => {
        if (edge.selected) {
          const updEdge = { ...edge, label: props.label }
          setEdges((eds) => eds.filter((item) => !item.selected))
          setEdges((eds) => eds.concat(updEdge))
        }
      })
    }
  }

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
          style={{ height: "80vh" }}
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
            onPaneClick={() => setProperty({})}
            nodeTypes={nodeTypes}
            fitView
          >
            <Panel position="bottom-center">
              <Grid container spacing={1}>
                <Grid item>
                  <Typography variant="span" style={{backgroundColor: "#d0ffdb", padding: "20px", borderRadius: "10px", fontSize: "12px"}}>
                    Login Service Flow
                  </Typography>
                </Grid>
              </Grid>
            </Panel>
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
              </Grid>
            </Panel>
            <Controls />
            <MiniMap zoomable pannable />
            <Background />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      {!showPage.show && (
        <PropertyPanel
          props={property}
          onComponentChange={onPropertyChange}
          onShowPage={setShowPage}
          display={setProperty}
        />
      )}
    </div>
  )
}

export default ServiceFlow
