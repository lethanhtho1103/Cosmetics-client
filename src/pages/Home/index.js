import { Box } from '@mui/material';
import * as React from 'react';
import ImageCarousel from '~/components/ImageCarousel';
import UserLayout from '~/layouts/UserLayout';
import img5 from '~/assets/image/img5.jpg';
import img6 from '~/assets/image/img6.jpg';

function Home() {
  return (
    <UserLayout>
      <Box sx={{ width: '100%', display: 'flex' }}>
        <Box sx={{ width: '75%' }}>
          <ImageCarousel />
        </Box>
        <Box sx={{ width: '25%', flexDirection: 'column', marginLeft: '4px' }}>
          <Box
            component="img"
            sx={{
              height: '49.5%',
              display: 'block',
              width: '100%',
              marginBottom: '1%',
            }}
            src={img5}
            alt=""
          />
          <Box
            component="img"
            sx={{
              height: '49.5%',
              display: 'block',
              width: '100%',
            }}
            src={img6}
            alt=""
          />
        </Box>
      </Box>
    </UserLayout>
  );
}
export default Home;
