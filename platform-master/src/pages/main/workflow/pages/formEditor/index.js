import React from 'react';
import {
  defaultSchemaDecorators,
  defaultSchemaProviders
} from './editor';

import { ExampleSchemaService } from './core/schemaService';
import JsonFormPage from './JsonFormPage';

const schemaService = new ExampleSchemaService();
const FormEditor = props => (
  <JsonFormPage
    {...props}
    schemaService={schemaService}
    schemaProviders={defaultSchemaProviders}
    schemaDecorators={defaultSchemaDecorators}
  />
);

export default FormEditor
