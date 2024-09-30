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

import { serviceflows } from "../../../_mock/serviceflow"
import Iconify from "../../../components/iconify"
import Scrollbar from "../../../components/scrollbar"
import TableNoData from "../table-no-data"
import ServiceFlowTableRow from "../serviceflow-table-row"
import ServiceFlowTableHead from "../serviceflow-table-head"
import TableEmptyRows from "../table-empty-rows"
import ServiceFlowTableToolbar from "../serviceflow-table-toolbar"
import { emptyRows, applyFilter, getComparator } from "../utils"
import NewServiceflowModal from "../modal"

// ----------------------------------------------------------------------

export default function ServiceFlowPage() {
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
      const newSelecteds = serviceflows.map(n => n.name)
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
    inputData: serviceflows,
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
          <Typography variant="h4">ServiceFlows</Typography>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={()=>setOpenModal(true)}
          >
            New ServiceFlow
          </Button>
        </Stack>

        <Card>
          <ServiceFlowTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: "unset" }}>
              <Table sx={{ minWidth: 800 }}>
                <ServiceFlowTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={serviceflows.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: "id", label: "Id" },
                    { id: "projectName", label: "Project Name" },
                    { id: "serviceFlowName", label: "Serviceflow Name" },
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
                      <ServiceFlowTableRow
                        key={row.id}
                        id={row.id}
                        projectName={row.projectName}
                        serviceFlowName={row.serviceFlowName}
                        createdDate={row.createdDate}
                        updatedDate={row.updatedDate}
                        version={row.version}
                        manager={row.manager}
                        status={row.status}
                        projectUrl={row.projectUrl}
                        serviceFlowUrl={row.serviceFlowUrl}
                        handleClick={event =>
                          handleClick(event, row.serviceFlowName)}
                      />
                    )}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, serviceflows.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={serviceflows.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <NewServiceflowModal openModal={openModal} setOpenModal={setOpenModal} />
    </React.Fragment>
  )
}
