import React from "react"
import { makeStyles } from "@mui/styles"
import { spacing } from '@mui/system'

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: spacing(2),
    marginBottom: spacing(2),
    minHeight: 0
  },
  container: {
    display: "grid",
    height: "100vh",
    gridTemplateAreas: "header content footer",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto 1fr auto"
  }
}))

export const Layout = ({ HeaderComponent, FooterComponent, children }) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <header>{HeaderComponent ? <HeaderComponent /> : null}</header>
      <main className={classes.main}>{children}</main>
      <footer className={FooterComponent ? classes.footer : undefined}>
        {FooterComponent ? <FooterComponent /> : null}
      </footer>
    </div>
  )
}
