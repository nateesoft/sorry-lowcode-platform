import React, { useCallback, useEffect, useState } from "react"
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
  const defaultPaletteService = new DefaultPaletteService()
  const defaultCategorizationService = new CategorizationServiceImpl()
  
  const [schemaService, setSchemaService] = useState(null)
  const [loadSchema, setLoadSchema] = useState(null)
  const [loadUiSchema, setLoadUiSchema] = useState(null)
  const [loadData, setLoadData] = useState(null)

  const initLoad = useCallback(() => {
    setLoadSchema(localLoad(id + "_template_schema", schema))
    setLoadUiSchema(localLoad(id + "_template_schema", uischema))
    setLoadData(localLoad(id + "_template_schema", data))
  
    setSchemaService(new ExampleSchemaService(loadSchema, loadUiSchema, loadData))
  }, [id, loadData, loadSchema, loadUiSchema])

  useEffect(()=> {
    initLoad()
  }, [initLoad])

  return loadSchema && (
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
