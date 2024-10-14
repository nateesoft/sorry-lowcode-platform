import React, { useState } from "react"
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from "@mui/material"
import { v4 as uuid } from "uuid"

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

const NewServiceflowModal = ({ openModal, setOpenModal }) => {
  const [id] = useState(uuid())
  const [projectName, setProjectName] = useState("")
  const [serviceflowName, setServiceFlowName] = useState("")
  const [updateDate] = useState(new Date())
  const [version, setVersion] = useState("0.1")
  const [status, setStatus] = useState("InActive")
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
            + New ServiceFlow
          </Typography>
        </Box>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              value={id}
              label="Id (Auto Generate)"
              variant="outlined"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs>
            <TextField
              value={projectName}
              label="Project Name"
              variant="outlined"
              fullWidth
              onChange={(evt)=>setProjectName(evt.target.value)}
            />
          </Grid>
          <Grid item xs>
            <TextField
              value={serviceflowName}
              label="Service Flow Name"
              variant="outlined"
              fullWidth
              onChange={(evt)=>setServiceFlowName(evt.target.value)}
            />
          </Grid>
          <Grid item xs>
            <TextField
              value={updateDate}
              label="Update Date"
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs>
            <TextField
              value={version}
              label="Version"
              variant="outlined"
              fullWidth
              onChange={(evt)=>setVersion(evt.target.value)}
            />
          </Grid>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel id="status">Status</InputLabel>
              <Select
                value={status}
                onChange={(evt) => setStatus(evt.target.value)}
              >
                <MenuItem value="InActive">In Active</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs alignItems="flex-end">
            <Box sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="warning"
                sx={{ margin: "10px" }}
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default NewServiceflowModal
