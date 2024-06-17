/**
 *
 * Home
 *
 */

import React from 'react'
import { materialCells, materialRenderers } from "@jsonforms/material-renderers"
import { JsonForms } from "@jsonforms/react"

import appConfig from '../../appConfig.json'

function Home() {
  return (
    <JsonForms
      schema={appConfig.application.app1.page.home.schema}
      uischema={appConfig.application.app1.page.home.uischema}
      data={appConfig.application.app1.page.home.data}
      renderers={materialRenderers}
      cells={materialCells}
    />
  );
}

export default Home;
