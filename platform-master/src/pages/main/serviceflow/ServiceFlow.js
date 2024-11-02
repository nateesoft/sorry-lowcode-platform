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
import { Button, Grid, Typography } from "@mui/material"
import axios from "axios"

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
  const { serviceFlowId, template } = props
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [property, setProperty] = useState({})
  const [showPage, setShowPage] = useState({})

  console.log("ServiceFlow:", props)

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            label: "",
            type: "smoothstep",
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
  const findNodeInEdges = (nodeId) =>
    edges.filter((edge) => {
      return edge.source === nodeId
    })

  const onNodeClick = () => {
    nodes.forEach((node) => {
      if (node.selected) {
        const nextProcess = findNodeInEdges(node.id)
        axios
        .get(`/api/master/webapps/serviceflow-design/${node.id}`)
        .then((response) => {
          console.log(response)
          if (response.data.code === 200) {
            const data = response.data.data
            const {editor_logic, next_process} = data
            const editorLogic = editor_logic ? JSON.parse(editor_logic): "{}"
            const nextProcess = next_process ? JSON.parse(next_process): []
            setProperty({
              id: node.id,
              serviceFlowId: serviceFlowId,
              boxName: data.box_name,
              boxType: data.box_type,
              folder: data.folder,
              outputType: data.output_type,
              component: "node",
              action: "edit",
              editorLogic: editorLogic,
              editorType: data.editor_type,
              nextProcess: nextProcess
            })
          } else {
            setProperty({
              id: node.id,
              serviceFlowId: serviceFlowId,
              boxName: node.data.label,
              boxType: node.type,
              folder: "",
              outputType: "",
              component: "node",
              nextProcess,
              action: "create"
            })
          }
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
      // localStorage.setItem(serviceFlowId, JSON.stringify(flow))
      // save to api
      axios
        .put(`/api/master/webapps/serviceflow/${serviceFlowId}`, {
          project_name: "POS Restuarant",
          project_icon: "/assets/icons/navbar/ic_project.svg",
          workflow_icon: "/assets/icons/navbar/ic_serviceflow.svg",
          serviceflow_name: "ServiceFlow-01",
          update_by: "natheep",
          versions: "0.0.1",
          status: "Y",
          template: JSON.stringify(flow),
          mapping_logic: "{}",
          uri_path: "/login"
        })
        .then((response) => {
          // setTemplate(response.data.products)
          console.log(response.data)
        })
    }
  }, [reactFlowInstance, serviceFlowId])

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      // const flow = JSON.parse(localStorage.getItem(serviceFlowId))
      if (template) {
        const flow = JSON.parse(template)
        if (flow) {
          setNodes(flow.nodes || [])
          setEdges(flow.edges || [])
        }
      }
    }

    restoreFlow()
  }, [template, setNodes, setEdges])

  const onPropertyChange = (props) => {
    console.log('onPropertyChange:', props)
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
                  <Typography
                    variant="span"
                    style={{
                      backgroundColor: "#d0ffdb",
                      padding: "20px",
                      borderRadius: "10px",
                      fontSize: "12px"
                    }}
                  >
                    Login Service Flow
                  </Typography>
                </Grid>
              </Grid>
            </Panel>
            <Panel position="top-right">
              <Grid container spacing={1}>
                <Grid item>
                  <Button variant="contained" color="info" onClick={onSave}>
                    Save Layout
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
          serviceFlowId={serviceFlowId}
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
