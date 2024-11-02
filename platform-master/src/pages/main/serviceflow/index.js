import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import { useParams } from "react-router"
import axios from "axios"

import { initServiceflowTemplate } from '../../../initData/template'
import ServiceFlow from "./ServiceFlow"

const ServiceFlowMain = () => {
  const { id: serviceFlowId } = useParams()
  const [template, setTemplate] = useState("")

  useEffect(() => {
    axios
      .get(`/api/master/webapps/serviceflow/${serviceFlowId}`)
      .then((response) => {
        if (response.data.code === 200) {
          setTemplate(JSON.stringify(response.data.data.template))
        } else {
          setTemplate(JSON.stringify(initServiceflowTemplate))
        }
      })
  }, [serviceFlowId])

  return (
    <Box sx={{ width: "100%" }}>
      <ServiceFlow serviceFlowId={serviceFlowId} template={template} />
    </Box>
  )
}

export default ServiceFlowMain
