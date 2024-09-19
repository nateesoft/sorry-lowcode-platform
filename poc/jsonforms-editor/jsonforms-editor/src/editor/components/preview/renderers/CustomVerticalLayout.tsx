import React from 'react';
import { JsonFormsDispatch, withJsonFormsLayoutProps } from '@jsonforms/react';
import {
  rankWith,
  uiTypeIs,
  JsonSchema,
  UISchemaElement,
} from '@jsonforms/core';

const CustomVerticalLayout: any = (props: {
  uischema: any;
  schema: any;
  path: any;
  enabled: any;
  renderers: any;
  cells: any;
}) => {
  const { uischema, schema, path, enabled, renderers, cells } = props;
  return (
    <JsonFormsDispatch
      uischema={uischema}
      schema={schema}
      path={path}
      enabled={enabled}
      renderers={renderers}
      cells={cells}
    />
  );
};

export const customVerticalLayoutTester = rankWith(
  45,
  uiTypeIs('CustomVerticalLayout')
);
export default withJsonFormsLayoutProps(CustomVerticalLayout);
