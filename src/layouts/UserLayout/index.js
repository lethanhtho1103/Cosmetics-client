import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import './UserLayout.scss';
import Header from '~/layouts/components/Header';
import Footer from '../components/Footer';
import PhoneIcon from '@mui/icons-material/Phone';
import { useEffect, useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function UserLayout({ children }) {
  const [showButton, setShowButton] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  const handlePhoneClick = () => {
    setShowPhoneNumber((prev) => !prev);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Header />
      <Box className="content">
        {children}
        <Tooltip title="Phone">
          <Fab
            color="primary"
            aria-label="phone"
            size="small"
            onClick={handlePhoneClick}
            sx={{ position: 'fixed', bottom: '72px', right: '16px' }}
          >
            <PhoneIcon sx={{ color: '#fff' }} />
          </Fab>
        </Tooltip>
        {showPhoneNumber && (
          <Typography
            variant="h6"
            sx={{
              position: 'fixed',
              bottom: '74px',
              right: '60px',
              fontSize: '16px',
              fontWeight: 600,
              color: '#fafafa',
              background: '#f6831f',
              padding: '6px 8px',
              borderRadius: '44px',
            }}
          >
            0972221953
          </Typography>
        )}
        {showButton && (
          <Fab size="small" onClick={scrollToTop} sx={{ position: 'fixed', bottom: 16, right: 16, background: '#fff' }}>
            <ArrowUpwardIcon color="primary" />
          </Fab>
        )}
      </Box>
      <Footer />
    </Container>
  );
}

export default UserLayout;
