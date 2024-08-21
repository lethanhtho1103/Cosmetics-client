import { Container } from '@mui/material';
import './UserLayout.scss';
import Header from '~/layouts/components/Header';
import Footer from '../components/Footer';

function UserLayout({ children }) {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </Container>
  );
}

export default UserLayout;
