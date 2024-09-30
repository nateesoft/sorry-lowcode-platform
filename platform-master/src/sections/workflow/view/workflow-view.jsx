import React, { useState } from "react"

import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import TableBody from "@mui/material/TableBody"
import Typography from "@mui/material/Typography"
import TableContainer from "@mui/material/TableContainer"
import TablePagination from "@mui/material/TablePagination"

import { workflows } from "../../../_mock/workflow"
import Iconify from "../../../components/iconify"
import Scrollbar from "../../../components/scrollbar"
import TableNoData from "../table-no-data"
import WorkFlowTableRow from "../workflow-table-row"
import WorkFlowTableHead from "../workflow-table-head"
import TableEmptyRows from "../table-empty-rows"
import WorkFlowTableToolbar from "../workflow-table-toolbar"
import { emptyRows, applyFilter, getComparator } from "../utils"

import NewWorkflowModal from "../modal"

// ----------------------------------------------------------------------

export default function WorkFlowPage() {
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState("asc")
  const [selected, setSelected] = useState([])
  const [orderBy, setOrderBy] = useState("name")
  const [filterName, setFilterName] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [openModal, setOpenModal] = useState(false)

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc"
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc")
      setOrderBy(id)
    }
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = workflows.map(n => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setPage(0)
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  const handleFilterByName = event => {
    setPage(0)
    setFilterName(event.target.value)
  }

  const dataFiltered = applyFilter({
    inputData: workflows,
    comparator: getComparator(order, orderBy),
    filterName
  })

  const notFound = !dataFiltered.length && !!filterName

  return (
    <React.Fragment>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">WorkFlows</Typography>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setOpenModal(true)}
          >
            New WorkFlow
          </Button>
        </Stack>

        <Card>
          <WorkFlowTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: "unset" }}>
              <Table sx={{ minWidth: 800 }}>
                <WorkFlowTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={workflows.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: "id", label: "Id" },
                    { id: "projectName", label: "Project Name" },
                    { id: "workFlowName", label: "Workflow Name" },
                    { id: "updatedDate", label: "Update Date" },
                    { id: "version", label: "Version" },
                    { id: "status", label: "Status" },
                    { id: "" }
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row =>
                      <WorkFlowTableRow
                        key={row.id}
                        id={row.id}
                        projectName={row.projectName}
                        workFlowName={row.workFlowName}
                        createdDate={row.createdDate}
                        updatedDate={row.updatedDate}
                        version={row.version}
                        manager={row.manager}
                        status={row.status}
                        projectUrl={row.projectUrl}
                        workFlowUrl={row.workFlowUrl}
                        handleClick={event =>
                          handleClick(event, row.workFlowName)}
                      />
                    )}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, workflows.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={workflows.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <NewWorkflowModal openModal={openModal} setOpenModal={setOpenModal} />
    </React.Fragment>
  )
}
