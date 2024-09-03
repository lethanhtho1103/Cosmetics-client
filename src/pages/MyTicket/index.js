import UserLayout from '~/layouts/UserLayout';
import { Box, Container } from '@mui/material';
import CustomBreadcrumbs from '~/components/Breakcrumbs';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import './MyTicket.scss';
import { Link } from 'react-router-dom';

function MyTicket() {
  const routes = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Tài khoản của tôi', path: '' },
  ];
  return (
    <UserLayout>
      <Container disableGutters maxWidth={false} className="container">
        <CustomBreadcrumbs routes={routes} />
        <main className="page-main">
          <Box className="my-ticket">
            <Box className="side-bar">
              <ul className="nav-items">
                <li className="nav-item active">
                  <strong>
                    <AccountCircleOutlinedIcon />
                    Tài khoản của tôi
                  </strong>
                </li>
                <li className="nav-item">
                  <strong>
                    <InventoryOutlinedIcon />
                    Quản lý đơn hàng
                  </strong>
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
              <h2>Tài khoản của tôi</h2>
              <Box className="box-info">
                <Box className="box-title">Thông tin cá nhân</Box>
                <Box className="box-content">
                  <strong>Lê Thành Thọ - 0972221953</strong>
                  <div>Email: lethanhtho1953@gmail.com</div>
                </Box>
                <Box className="box-action">
                  <Link to="/">Chỉnh sửa</Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </main>
      </Container>
    </UserLayout>
  );
}

export default MyTicket;
