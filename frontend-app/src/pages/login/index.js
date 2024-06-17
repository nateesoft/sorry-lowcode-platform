/**
 *
 * Login
 *
 */

import React from 'react'
import { materialCells, materialRenderers } from "@jsonforms/material-renderers"
import { JsonForms } from "@jsonforms/react"

import appConfig from '../../appConfig.json'

function Login() {
  return (
    <JsonForms
      schema={appConfig.application.app1.page.login.schema}
      uischema={appConfig.application.app1.page.login.uischema}
      data={appConfig.application.app1.page.login.data}
      renderers={materialRenderers}
      cells={materialCells}
    />
  );
}

export default Login;
