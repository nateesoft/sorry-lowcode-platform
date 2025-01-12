import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import { useParams } from "react-router"

import apiClient from '../../../httpRequest'
import { initWorkflowTemplate } from '../../../initData/template'
import WorkFlow from "./WorkFlow"

const WorkFlowMain = () => {
  const { id: workFlowId } = useParams()
  const [template, setTemplate] = useState("")

  useEffect(() => {
    apiClient
      .get(`/api/master/webapps/workflow/${workFlowId}`)
      .then((response) => {
        if (response.data.code === 200) {
          setTemplate(JSON.stringify(response.data.data.template))
        } else {
          setTemplate(JSON.stringify(initWorkflowTemplate))
        }
      })
  }, [workFlowId])

  return (
    <Box sx={{ width: "100%" }}>
      <WorkFlow workFlowId={workFlowId} template={template} />
    </Box>
  )
}

export default WorkFlowMain
