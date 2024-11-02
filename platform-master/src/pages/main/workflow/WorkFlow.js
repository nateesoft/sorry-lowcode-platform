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
import { Link } from "react-router-dom"
import axios from "axios"
import { Button, Grid } from "@mui/material"

import "reactflow/dist/style.css"

import LeftMenu from "./LeftMenu"
import PropertyPanel from "./PropertyPanel"
import PagePanel from "./PagePanel"

import ActorNode from "./nodes/ActorNode"
import StartNode from "./nodes/StartNode"
import EndNode from "./nodes/EndNode"
import PageNode from "./nodes/PageNode"
import MegessaNode from "./nodes/MessageNode"
import DatabaseNode from "./nodes/DatabaseNode"
import ServerNode from "./nodes/ServerNode"

import "./index.css"

const nodeTypes = {
  actor: ActorNode,
  start: StartNode,
  end: EndNode,
  page: PageNode,
  message: MegessaNode,
  database: DatabaseNode,
  server: ServerNode
}

const WorkFlowMain = (props) => {
  const { workFlowId, template } = props
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [property, setProperty] = useState({})
  const [showPage, setShowPage] = useState({})

  console.log('WorkFlowMain:', props)

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
      } else if (type === "end") {
        label = "End"
      } else if (type === "page") {
        label = "Page"
      } else if (type === "actor") {
        label = "User"
      } else if (type === "message") {
        label = "Message"
      } else if (type === "database") {
        label = "Database"
      } else if (type === "server") {
        label = "Server"
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
        console.log('onNodeClick:', node)
        nodes.forEach(node=> {
          node.style.border = ""
          node.style.background = ""
        })
        node.style = { ...node.style,
          border: "2px solid #5ba9de",
          borderRadius: "10px",
          background: "#5ba9de"
         }
        setNodes((nds) => nds.concat(node))

        setProperty({
          id: node.id,
          label: node.data.label,
          type: node.type,
          component: "node"
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

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject()
      // localStorage.setItem(flowKey + "_" + workFlowId, JSON.stringify(flow))
      // save to api
      axios
        .put(`/api/master/webapps/workflow/${workFlowId}`, {
          project_name: "POS Restuarant",
          project_icon: "/assets/icons/navbar/ic_project.svg",
          workflow_icon: "/assets/icons/navbar/ic_workflow.svg",
          workflow_name: "WorkFlow-01",
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
  }, [reactFlowInstance, workFlowId])

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      // const flow = JSON.parse(localStorage.getItem(flowKey + "_" + workFlowId))
      if (template) {
        const flow = JSON.parse(template)
        if(flow){
          setNodes(flow.nodes || [])
          setEdges(flow.edges || [])
        }
      }
    }

    restoreFlow()
  }, [template, setNodes, setEdges])

  // const handlePreview = () => {
  //   // window.open("http://localhost:3000/app1")
  //   axios
  //     .get("/api/frontend")
  //     .then(({ data }) => {
  //       if (data.redirectUrl) {
  //         window.open(data.redirectUrl)
  //       }
  //     })
  //     .catch((error) => {
  //       alert(error.message)
  //     })
  // }

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
          style={{ height: "88vh" }}
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
                <Grid item>
                  <Link to="/demo/page_node_0t0udq" target="_blank">
                    <Button
                      variant="contained"
                      color="success"
                    >
                      Publish
                    </Button>
                  </Link>
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
      <PagePanel
        condition={showPage}
        property={setProperty}
        onClose={() => setShowPage({ show: false, page: null })}
        {...property}
      />
    </div>
  )
}

export default WorkFlowMain
