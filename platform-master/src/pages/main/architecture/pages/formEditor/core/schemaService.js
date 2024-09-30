export class ExampleSchemaService {
  constructor(schema, uischema, data){
    this.state = {
      schema,
      uischema,
      data
    }
  }
  getSchema = async () => this.state.schema
  getUiSchema = async () => this.state.uischema
  getData = async () => this.state.data
}
