import React from 'react'
import { materialCells, materialRenderers } from "@jsonforms/material-renderers"
import { JsonForms } from "@jsonforms/react"

import schema from './schema.json'
import uischema from './uischema.json'
import data from './uischema.json'

function Template() {
  return (
    <JsonForms
      schema={schema}
      uischema={uischema}
      data={data}
      renderers={materialRenderers}
      cells={materialCells}
    />
  );
}

export default Template;
