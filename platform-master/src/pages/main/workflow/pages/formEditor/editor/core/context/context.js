import { useContext, createContext } from "react"

/**We always use a provider so default can be undefined*/
const defaultContext = undefined

export const EditorContextInstance = createContext(defaultContext)

export const useEditorContext = () => useContext(EditorContextInstance)

export const useGitLabService = () => {
  const { schemaService } = useEditorContext()
  return schemaService
}

export const useSchema = () => {
  const { schema } = useEditorContext()
  return schema
}

export const useUiSchema = () => {
  const { uiSchema } = useEditorContext()
  return uiSchema
}

export const useSelection = () => {
  const { selection, setSelection } = useEditorContext()
  return [selection, setSelection]
}

export const useDispatch = () => {
  const { dispatch } = useEditorContext()
  return dispatch
}

export const usePaletteService = () => {
  const { paletteService } = useEditorContext()
  return paletteService
}

export const usePropertiesService = () => {
  const { propertiesService } = useEditorContext()
  return propertiesService
}

export const useCategorizationService = () => {
  const { categorizationService } = useEditorContext()
  return categorizationService
}
