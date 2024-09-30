import rule from './specification/rule.json';
import schema from './specification/schema.json';

export const jsonSchemaDraft7 = {
  uri: 'http://json-schema.org/draft-07/schema',
  schema: schema,
};

export const ruleSchema = {
  uri: 'http://jsonforms.io/uischema/rule',
  schema: rule,
};
