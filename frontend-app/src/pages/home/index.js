/**
 *
 * Home
 *
 */

import React from 'react'
import { materialCells } from "@jsonforms/material-renderers"
import { JsonForms } from "@jsonforms/react"

import { renderers } from '../components/renderers'

import uischema from "./uischema.json"
import schema from "./schema.json"
import data from "./data.json"

function Home() {
  return (
    <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        cells={materialCells}
      />
  );
}

export default Home;
