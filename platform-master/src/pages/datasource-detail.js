import { Helmet } from 'react-helmet-async';

import { DSDetailView } from '../sections/datasourceDetails/view';

// ----------------------------------------------------------------------
export default function DatasourcePage() {
  return (
    <>
      <Helmet>
        <title> Datasource </title>
      </Helmet>

      <h1>LoginDB</h1>
      <DSDetailView />
    </>
  );
}
