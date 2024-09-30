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

import { datasource } from "../../../_mock/datasource"
import Iconify from "../../../components/iconify"
import Scrollbar from "../../../components/scrollbar"
import TableNoData from "../table-no-data"
import DatasourceTableRow from "../datasource-table-row"
import DatasourceTableHead from "../datasource-table-head"
import TableEmptyRows from "../table-empty-rows"
import DatasourceTableToolbar from "../datasource-table-toolbar"
import { emptyRows, applyFilter, getComparator } from "../utils"

import NewDatasourceModal from "../modal"

// ----------------------------------------------------------------------

export default function DatasourcePage() {
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState("asc")
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
    inputData: datasource,
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
          <Typography variant="h4">Datasources</Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setOpenModal(true)}
          >
            New Datasource
          </Button>
        </Stack>

        <Card>
          <DatasourceTableToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: "unset" }}>
              <Table sx={{ minWidth: 800 }}>
                <DatasourceTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleSort}
                  headLabel={[
                    { id: "name", label: "Name" },
                    { id: "created", label: "Created" },
                    { id: "tableCount", label: "Table Count" },
                    { id: "lastUserLogin", label: "User Login" },
                    { id: "status", label: "Status" },
                    { id: "" }
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row =>
                      <DatasourceTableRow
                        key={row.id}
                        id={row.id}
                        name={row.name}
                        status={row.status}
                        created={row.created}
                        tableCount={row.tableCount}
                        lastUserLogin={row.lastUserLogin}
                        avatarUrl={row.avatarUrl}
                      />
                    )}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, datasource.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={datasource.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <NewDatasourceModal openModal={openModal} setOpenModal={setOpenModal} />
    </React.Fragment>
  )
}
