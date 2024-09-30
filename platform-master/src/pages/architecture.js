import { Helmet } from 'react-helmet-async';

import { ArchitectureView } from '../sections/architecture/view';

// ----------------------------------------------------------------------

export default function ArchitecturePage() {
  return (
    <>
      <Helmet>
        <title> Architecture | Minimal UI </title>
      </Helmet>

      <ArchitectureView />
    </>
  );
}
