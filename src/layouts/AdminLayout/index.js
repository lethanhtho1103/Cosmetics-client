import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import Header from '~/layouts/components/HeaderAdmin';
import Sidebar from '../components/SidebarAdmin/Sidebar';

function AdminLayout({ children }) {
  return (
    <Grid container sx={{ height: '100vh', maxWidth: '100%', mx: 'auto' }}>
      <Grid item xs={12} md={3} lg={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={9} lg={10}>
        <Header />
        <Box sx={{ p: 2, backgroundColor: '#f4f7ff', minHeight: 'calc(100vh - 64px)' }}>{children}</Box>
      </Grid>
    </Grid>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
