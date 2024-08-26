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
      <Typography
        sx={{ fontSize: '12px', textTransform: 'uppercase', marginTop: '4px', fontWeight: 500 }}
        key={index}
        color="inherit"
      >
        {route.name}
      </Typography>
    ) : (
      <Link
        sx={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 500 }}
        underline="hover"
        key={index}
        color="text.primary"
        component={RouterLink}
        to={route.path}
      >
        {route.name}
      </Link>
    );
  });

  return (
    <Stack sx={{ maxWidth: '1320px', marginLeft: 'auto', marginRight: 'auto', padding: '12px 20px' }}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
