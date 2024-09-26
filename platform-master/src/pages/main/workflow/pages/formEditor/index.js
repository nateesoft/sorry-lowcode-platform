import React from "react"
import {
  DefaultPaletteService,
  defaultSchemaDecorators,
  defaultSchemaProviders,
  CategorizationServiceImpl
} from "./editor"

import { ExampleSchemaService } from "./core/schemaService"
import JsonFormPage from "./JsonFormPage"

import schema from "../schema.json"
import uischema from "../uischema.json"
import data from "../data.json"

function localLoad(pageKey, temp) {
  const haveData = JSON.parse(localStorage.getItem(pageKey))
  if (haveData) {
    return haveData
  }

  return temp
}

const FormEditor = (props) => {
  const { id } = props
  const loadSchema = localLoad(id + "_template_schema", schema)
  const loadUiSchema = localLoad(id + "_template_uischema", uischema)
  const loadData = localLoad(id + "_template_data", data)

  const schemaService = new ExampleSchemaService(loadSchema, loadUiSchema, loadData)
  const defaultPaletteService = new DefaultPaletteService()
  const defaultCategorizationService = new CategorizationServiceImpl()
  console.log("FormEditor:", props)

  return (
    <JsonFormPage
      {...props}
      schema={loadSchema}
      uischema={loadUiSchema}
      data={loadData}
      schemaService={schemaService}
      paletteService={defaultPaletteService}
      categorizationService={defaultCategorizationService}
      schemaProviders={defaultSchemaProviders}
      schemaDecorators={defaultSchemaDecorators}
    />
  )
}

export default FormEditor
