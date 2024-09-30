import { Helmet } from 'react-helmet-async';

import { ServiceFlowView } from '../sections/serviceflow/view';

// ----------------------------------------------------------------------
export default function ServiceFlow() {
  return (
    <>
      <Helmet>
        <title> Work Flow | Minimal UI </title>
      </Helmet>

      <ServiceFlowView />
    </>
  );
}
