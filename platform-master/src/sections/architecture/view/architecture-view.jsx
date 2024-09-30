import React from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------
export default function ProductsView() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Architecture
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <div>Architecure Overview</div>
      </Stack>
    </Container>
  );
}
