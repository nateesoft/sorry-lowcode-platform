import React from "react"
import JsonFormPage from "./pages/formEditor"

function PagePanel(props) {
  if (!props.condition.show) {
    return <></>
  }

  if(props.condition.page === 'jsonform') {
    return <JsonFormPage {...props} />
  }

}

export default PagePanel
