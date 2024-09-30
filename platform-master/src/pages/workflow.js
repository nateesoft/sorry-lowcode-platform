import { Helmet } from 'react-helmet-async';

import { WorkFlowView } from '../sections/workflow/view';

// ----------------------------------------------------------------------
export default function WorkFlow() {
  return (
    <>
      <Helmet>
        <title> Work Flow | Minimal UI </title>
      </Helmet>

      <WorkFlowView />
    </>
  );
}
