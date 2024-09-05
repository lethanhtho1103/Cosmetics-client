import UserLayout from '~/layouts/UserLayout';
import { Box, Container } from '@mui/material';
import CustomBreadcrumbs from '~/components/Breakcrumbs';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import './Account.scss';
import { Link, Outlet, useLocation } from 'react-router-dom';

function Account() {
  const routes = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Tài khoản của tôi', path: '' },
  ];

  const location = useLocation();
  console.log(location.pathname);

  return (
    <UserLayout>
      <Container disableGutters maxWidth={false} className="container">
        <CustomBreadcrumbs routes={routes} />
        <main className="page-main">
          <Box className="my-ticket">
            <Box className="side-bar">
              <ul className="nav-items">
                <li className="nav-item">
                  <Link to="/account" className={`${location.pathname === '/account' ? 'active' : ''}`}>
                    <strong>
                      <AccountCircleOutlinedIcon />
                      Tài khoản của tôi
                    </strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/account/orders" className={`${location.pathname === '/account/orders' ? 'active' : ''}`}>
                    <strong>
                      <InventoryOutlinedIcon />
                      Quản lý đơn hàng
                    </strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <strong>
                    <LogoutIcon />
                    Đăng xuất
                  </strong>
                </li>
              </ul>
            </Box>
            <Box className="column-main">
              <Outlet />
            </Box>
          </Box>
        </main>
      </Container>
    </UserLayout>
  );
}

export default Account;
