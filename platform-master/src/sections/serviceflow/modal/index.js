import React, { useState } from "react"
import {
  Box,
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from "@mui/material"
import CancelIcon from '@mui/icons-material/Cancel'
import SaveIcon from '@mui/icons-material/Save'
import moment from 'moment'

import apiClient from '../../../httpRequest'
import { initServiceflowTemplate } from '../../../initData/template'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
}

const NewServiceflowModal = ({ openModal, setOpenModal, initLoad }) => {
  const [projectName, setProjectName] = useState("")
  const [serviceflowName, setServiceFlowName] = useState("")
  const [createDate] = useState(new Date())
  const [version, setVersion] = useState("0.1")
  const [status, setStatus] = useState("N")

  function save() {
    apiClient
      .post("/api/master/webapps/serviceflow", {
        project_name: projectName,
        project_icon: "/assets/icons/navbar/ic_project.svg",
        workflow_icon: "/assets/icons/navbar/ic_serviceflow.svg",
        serviceflow_name: serviceflowName,
        create_by: "natheep",
        template: JSON.stringify(initServiceflowTemplate),
        mapping_logic: "{}",
        uri_path: "/login"
      })
      .then((response) => {
        console.log("response:", response)
        setOpenModal(false)
        initLoad()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, width: 450 }}>
        <Box sx={{ paddingBottom: "10px" }}>
          <Typography variant="h5" sx={{ color: "#aaaaaa" }}>
            New ServiceFlow
          </Typography>
        </Box>
        <Grid2 container direction="column" spacing={2}>
          <TextField
            value={projectName}
            label="Project Name"
            variant="outlined"
            fullWidth
            onChange={(evt) => setProjectName(evt.target.value)}
          />
          <TextField
            value={serviceflowName}
            label="Service Flow Name"
            variant="outlined"
            fullWidth
            onChange={(evt) => setServiceFlowName(evt.target.value)}
          />
          <TextField
            value={moment(createDate).format('DD/MM/YYYY HH:mm:ss')}
            label="Create Date"
            variant="outlined"
            fullWidth
            disabled
          />
          <TextField
            value={version}
            label="Version"
            variant="outlined"
            fullWidth
            onChange={(evt) => setVersion(evt.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="status">Status</InputLabel>
            <Select
              value={status}
              label="status"
              onChange={(evt) => setStatus(evt.target.value)}
            >
              <MenuItem value="N">In Active</MenuItem>
              <MenuItem value="Y">Active</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="warning"
              sx={{ margin: "10px" }}
              onClick={() => setOpenModal(false)}
              endIcon={<CancelIcon />}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => save()}
              endIcon={<SaveIcon />}>
              Save
            </Button>
          </Box>
        </Grid2>
      </Box>
    </Modal>
  )
}

export default NewServiceflowModal
