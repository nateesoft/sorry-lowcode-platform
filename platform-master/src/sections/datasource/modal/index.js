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

const NewDatasourceModal = ({ openModal, setOpenModal }) => {
  const [id] = useState(uuid())
  const [DSName, setDSName] = useState("")
  const [DSType, setDSType] = useState("mysql")
  const [createDate] = useState(new Date())
  const [updateDate] = useState(new Date())
  const [tableCount] = useState(2)
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
            + New Datasource
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
              value={DSName}
              label="Datasource Name"
              variant="outlined"
              fullWidth
              onChange={(evt)=>setDSName(evt.target.value)}
            />
          </Grid>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel id="status">Datasource Type</InputLabel>
              <Select
                value={DSType}
                onChange={(evt) => setDSType(evt.target.value)}
              >
                <MenuItem value="mysql">MySQL</MenuItem>
                <MenuItem value="mongodb">MongoDB</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <TextField
              value={createDate}
              label="Create Date"
              variant="outlined"
              fullWidth
              disabled
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
              value={tableCount}
              label="Tables"
              variant="outlined"
              fullWidth
              disabled
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

export default NewDatasourceModal
