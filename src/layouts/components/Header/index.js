import { Box, Container } from '@mui/material';
import './Header.scss';
import { Link } from 'react-router-dom';
import Search from '../Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
function Header() {
  return (
    <Container disableGutters maxWidth={false} className="wrapper">
      <header className="page-header">
        <div className="header-content">
          <Box sx={{ zIndex: '102' }}>
            <Link to="/" className="logo">
              TT-SHOP
            </Link>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Search />
            <Box className="welcome">
              <AccountCircleIcon sx={{ marginRight: '8px' }} />
              <div className="not-logged-in">
                <Link to="/login">
                  <span>Đăng nhập</span>
                </Link>
                <span>&nbsp;/&nbsp;</span>
                <Link to="/register">
                  <span>Đăng ký</span>
                </Link>
              </div>
              {/* <div className="logged-in">Xin chào, Thành Thọ</div> */}
            </Box>
            <Link to="cart" className="cart">
              <ShoppingCartIcon sx={{ marginRight: '8px' }} />
              <div className="content">
                <div className="text">Giỏ hàng</div>
                <div style={{ fontWeight: 700 }}>0 Sản phẩm</div>
              </div>
              {/* <div className="logged-in">Xin chào, Thành Thọ</div> */}
            </Link>
          </Box>
        </div>
      </header>
      <div className="nav-sections">nav-sections</div>
    </Container>
  );
}

export default Header;
