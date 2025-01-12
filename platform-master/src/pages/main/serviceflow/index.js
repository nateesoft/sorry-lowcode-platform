import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import { useParams } from "react-router"

import apiClient from '../../../httpRequest'
import ServiceFlow from "./ServiceFlow"

const ServiceFlowMain = () => {
  const { id: serviceFlowId } = useParams()
  const [serviceInfo, setServiceInfo] = useState({})

  useEffect(() => {
    apiClient
      .get(`/api/master/webapps/serviceflow/${serviceFlowId}`)
      .then((response) => {
        if (response.data.code === 200) {
          setServiceInfo(response.data.data)
        }
      })
  }, [serviceFlowId])

  return (
    <Box sx={{ width: "100%" }}>
      <ServiceFlow serviceInfo={serviceInfo} />
    </Box>
  )
}

export default ServiceFlowMain
