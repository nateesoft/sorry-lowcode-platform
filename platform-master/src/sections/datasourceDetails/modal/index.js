import React, { useState } from "react"
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material"
import { v4 as uuid } from "uuid"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
}

const NewDatasourceDetailModal = ({ openModal, setOpenModal }) => {
  const [id] = useState(uuid())
  const [tableName, setTableName] = useState("")
  const [createDate] = useState(new Date())
  const [updateDate] = useState(new Date())
  const [status, setStatus] = useState("InActive")
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style }}>
        <Box sx={{ paddingBottom: "10px" }}>
          <Typography variant="h5" sx={{ color: "#aaaaaa" }}>
            + New Table / Source
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs>
                  <TextField
                    value={id}
                    label="Id (Auto Generate)"
                    variant="outlined"
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    value={tableName}
                    label="Table Name"
                    variant="outlined"
                    fullWidth
                    onChange={(evt) => setTableName(evt.target.value)}
                  />
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
                  <FormControl>
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                      value={status}
                      fullWidth
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
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={1}>
                <Grid item xs>
                  <TextField label="Column Name" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs>
                  <TextField label="Column Type" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs>
                  <TextField label="Column Size" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs>
                  <TextField label="Remark" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs>
                  <Button variant="contained" color="success">+</Button>
                </Grid>
              </Grid>
              <Grid container sx={{marginTop: '10px'}}>
                <Grid item xs>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 550 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Size</TableCell>
                          <TableCell>Remark</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>column_name</TableCell>
                          <TableCell>text</TableCell>
                          <TableCell>250</TableCell>
                          <TableCell>example row</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  )
}

export default NewDatasourceDetailModal
