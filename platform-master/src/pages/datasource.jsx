import { Helmet } from 'react-helmet-async';

import { DatasourceView } from '../sections/datasource/view';

// ----------------------------------------------------------------------
export default function DatasourcePage() {
  return (
    <>
      <Helmet>
        <title> Datasource | Minimal UI </title>
      </Helmet>

      <DatasourceView />
    </>
  );
}
