import { useCallback, useEffect, useRef, useState } from "react"

import { useSchema, useUiSchema } from "../context"
import { buildJsonSchema } from "../model"
import { buildUiSchema } from "../model/uischema"

const doBuildJsonSchema = schema => (schema ? buildJsonSchema(schema) : schema)

const doBuildUiSchema = uiSchema =>
  uiSchema ? buildUiSchema(uiSchema) : undefined

/**
 * Json Schema for export
 */
export const useExportSchema = () => {
  const schema = useSchema()
  return useTransform(schema, doBuildJsonSchema)
}

/**
 * Ui Schema for export
 */
export const useExportUiSchema = () => {
  const uiSchema = useUiSchema()
  return useTransform(uiSchema, doBuildUiSchema)
}

/**
 * Transforms the given element whenever it changes.
 */
export const useTransform = (element, transform) => {
  const [transformedElement, setTransformedElement] = useState(
    transform(element)
  )
  useEffectAfterInit(() => setTransformedElement(transform(element)), [
    element,
    transform
  ])
  return transformedElement
}

/**
 * Hook similar to `useEffect` with the difference that the effect
 * is only executed from the second call onwards.
 */
const useEffectAfterInit = (effect, dependencies) => {
  const firstExecution = useRef(true)
  useEffect(() => {
    if (firstExecution.current) {
      firstExecution.current = false
      return
    }
    effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies])
}

/** Force a rerender */
export const useUpdate = () => {
  const [, setCount] = useState(0)
  const update = useCallback(() => {
    setCount(count => count + 1)
  }, [])
  return update
}

/** Executes the callback and forces a rerender whenever the callback changes */
export const useEffectWithUpdate = effectCallback => {
  const update = useUpdate()
  useEffect(() => {
    effectCallback()
    update()
  }, [effectCallback, update])
}
