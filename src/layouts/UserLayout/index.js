import { Container } from '@mui/material';
import './UserLayout.scss';
import Header from '~/layouts/components/Header';

function UserLayout({ children }) {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Header />
      <div className="content">{children}</div>
    </Container>
  );
}

export default UserLayout;
