import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

export default function CustomBreadcrumbs({ routes }) {
  const breadcrumbs = routes.map((route, index) => {
    const isLast = index === routes.length - 1;

    return isLast ? (
      <Typography key={index} color="text.primary">
        {route.name}
      </Typography>
    ) : (
      <Link underline="hover" key={index} color="inherit" component={RouterLink} to={route.path}>
        {route.name}
      </Link>
    );
  });

  return (
    <Stack spacing={2} sx={{ maxWidth: '1320px', marginLeft: 'auto', marginRight: 'auto', padding: '12px 20px' }}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
