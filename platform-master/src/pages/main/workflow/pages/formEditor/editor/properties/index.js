import { materialRenderers } from '@jsonforms/material-renderers';

import { RuleEditorRendererRegistration } from './renderers/RuleEditorRenderer';

export { PropertiesPanel } from './components/PropertiesPanel';

export * from './schemaDecorators';
export * from './schemaProviders';
export * from './propertiesService';

export const defaultPropertyRenderers = [
  ...materialRenderers,
  RuleEditorRendererRegistration,
];
