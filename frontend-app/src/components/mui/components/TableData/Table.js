import React from "react"
import Grid from "@mui/material/Grid"

import { setDefaultVal } from "../../utils"
import BasicTable from "./Basic"
import SelectTable from "./Select"
import FreezeTable from "./Freeze"
import CollapsibleTable from "./Collapsible"
import CustomTable from "./Custom"
import PaginationTable from "./Pagination"
import GroupTable from "./Group"

const TableData = (props) => {
  const { uischema, data } = props
  const options = setDefaultVal(uischema.options, {})
  const style = setDefaultVal(options.style, "")
  const mock = setDefaultVal(data.grid, {})

  return (
    <Grid container sx={style.sx}>
      <Grid item xs={12}>
        {options.type === "basic" && (
          <BasicTable mock={mock} options={options} tableSchema={uischema} {...props} />
        )}
        {options.type === "select" && (
          <SelectTable {...mock} {...options} />
        )}
        {options.type === "freeze" && <FreezeTable {...mock} {...options} />}
        {options.type === "detail" && <CollapsibleTable {...mock} {...options} />}
        {options.type === "custom" && <CustomTable {...mock} {...options} />}
        {options.type === "pagination" && <PaginationTable {...mock} {...options} />}
        {options.type === "group" && <GroupTable {...mock} {...options} />}
      </Grid>
    </Grid>
  )
}

export default TableData
