import React, { useCallback, useEffect, useState } from "react"

import {
  DefaultPaletteService,
  defaultSchemaDecorators,
  defaultSchemaProviders,
  CategorizationServiceImpl
} from "./editor"

import apiClient from '../../../../../httpRequest'
import { ExampleSchemaService } from "./core/schemaService"
import JsonFormPage from "./JsonFormPage"

import schema from "../schema.json"
import uischema from "../uischema.json"
import data from "../data.json"

// function localLoad(pageKey, temp) {
//   const haveData = JSON.parse(localStorage.getItem(pageKey))
//   if (haveData) {
//     return haveData
//   }
//   return temp
// }

const FormEditor = (props) => {
  const { id } = props
  const defaultPaletteService = new DefaultPaletteService()
  const defaultCategorizationService = new CategorizationServiceImpl()

  const [schemaService, setSchemaService] = useState(null)
  const [loadSchema, setLoadSchema] = useState(null)
  const [loadUiSchema, setLoadUiSchema] = useState(null)
  const [loadData, setLoadData] = useState(null)

  // const initLoad = useCallback(() => {
  //   setLoadSchema(localLoad(id + "_template_schema", schema))
  //   setLoadUiSchema(localLoad(id + "_template_schema", uischema))
  //   setLoadData(localLoad(id + "_template_schema", data))

  //   setSchemaService(new ExampleSchemaService(loadSchema, loadUiSchema, loadData))
  // }, [id, loadData, loadSchema, loadUiSchema])

  const initLoad = useCallback(() => {
    apiClient.get(`/api/master/webapps/workflow-design/${id}`).then((response) => {
      console.log("initLoad:", response)

      if (response.data.code === 200) {
        const { template_schema, template_uischema, template_data } =
          response.data.data

        if (Object.keys(template_schema).length === 0) {
          setLoadSchema(schema)
        } else {
          setLoadSchema(template_schema)
        }

        if (Object.keys(template_uischema).length === 0) {
          setLoadUiSchema(uischema)
        } else {
          setLoadUiSchema(template_uischema)
        }

        if (Object.keys(template_data).length === 0) {
          setLoadData(data)
        } else {
          setLoadData(template_data)
        }
      } else {
        setLoadSchema(schema)
        setLoadUiSchema(uischema)
        setLoadData(data)
      }
      setSchemaService(
        new ExampleSchemaService(loadSchema, loadUiSchema, loadData)
      )
    })
  }, [])

  useEffect(() => {
    initLoad()
  }, [initLoad])

  return (
    loadSchema && (
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
  )
}

export default FormEditor
