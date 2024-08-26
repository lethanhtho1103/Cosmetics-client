import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '~/axios';
import authService from '~/services/authService';
import { logOutSuccess } from '~/redux/authSlice';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  console.log(currentUser);
  const accessToken = currentUser?.accessToken;
  const id = currentUser?.data?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    try {
      if (accessToken) {
        authService.logOut(dispatch, id, navigate, accessToken);
      } else {
        dispatch(logOutSuccess());
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container disableGutters maxWidth={false} className="wrapper">
      <header className="page-header">
        <div className="header-content">
          <Box sx={{ zIndex: '102' }}>
            <Link to="/" className="logo">
              ORANGE
            </Link>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Search />
            <Box className="welcome">
              {currentUser ? (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ paddingLeft: 0 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                      >
                        <Avatar
                          src={
                            currentUser?.data?.avatar.startsWith('http')
                              ? currentUser?.data?.avatar
                              : `${baseUrl}/${currentUser?.data?.avatar}`
                          }
                          sx={{ width: 32, height: 32 }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&::before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem>
                      <Avatar /> Profile
                    </MenuItem>
                    <MenuItem>
                      <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      Add another account
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                  <div className="logged-in">Xin chào, {currentUser?.data?.username}</div>
                </>
              ) : (
                <>
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
                </>
              )}
            </Box>
            <Link to="http://localhost:3000/cart" className="cart">
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
      <div className="nav-sections">
        <div className="magemenu-menu">
          <ul className="megamenu-items">
            <li className="megamenu-item">
              <div className="submenu-content">
                <div className="block-list">
                  <div className="block-item">
                    <div className="category-link">
                      <Link to="#">Làm sạch cơ thể</Link>
                    </div>
                    <ul className="megamenu-sub-items">
                      <li className="megamenu-sub-item">
                        <Link to="/#">Sữa tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Xà phòng tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Tẩy tế bào chết</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Nước rửa tay</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="block-item">
                    <div className="category-link">
                      <Link to="#">Làm sạch cơ thể</Link>
                    </div>
                    <ul className="megamenu-sub-items">
                      <li className="megamenu-sub-item">
                        <Link to="#">Sữa tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Xà phòng tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Tẩy tế bào chết</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Nước rửa tay</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="block-item">
                    <div className="category-link">
                      <Link to="#">Làm sạch cơ thể</Link>
                    </div>
                    <ul className="megamenu-sub-items">
                      <li className="megamenu-sub-item">
                        <Link to="#">Sữa tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Xà phòng tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Tẩy tế bào chết</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Nước rửa tay</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="block-item">
                    <div className="category-link">
                      <Link to="#">Làm sạch cơ thể</Link>
                    </div>
                    <ul className="megamenu-sub-items">
                      <li className="megamenu-sub-item">
                        <Link to="#">Sữa tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Xà phòng tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Tẩy tế bào chết</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Nước rửa tay</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="block-item">
                    <div className="category-link">
                      <Link to="#">Làm sạch cơ thể</Link>
                    </div>
                    <ul className="megamenu-sub-items">
                      <li className="megamenu-sub-item">
                        <Link to="#">Sữa tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Xà phòng tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Tẩy tế bào chết</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Nước rửa tay</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="block-item">
                    <div className="category-link">
                      <Link to="#">Làm sạch cơ thể</Link>
                    </div>
                    <ul className="megamenu-sub-items">
                      <li className="megamenu-sub-item">
                        <Link to="#">Sữa tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Xà phòng tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Tẩy tế bào chết</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Nước rửa tay</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="block-item">
                    <div className="category-link">
                      <Link to="#">Làm sạch cơ thể</Link>
                    </div>
                    <ul className="megamenu-sub-items">
                      <li className="megamenu-sub-item">
                        <Link to="#">Sữa tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Xà phòng tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Tẩy tế bào chết</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Nước rửa tay</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="block-item">
                    <div className="category-link">
                      <Link to="#">Làm sạch cơ thể</Link>
                    </div>
                    <ul className="megamenu-sub-items">
                      <li className="megamenu-sub-item">
                        <Link to="#">Sữa tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Xà phòng tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Tẩy tế bào chết</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Nước rửa tay</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="block-item">
                    <div className="category-link">
                      <Link to="#">Làm sạch cơ thể</Link>
                    </div>
                    <ul className="megamenu-sub-items">
                      <li className="megamenu-sub-item">
                        <Link to="#">Sữa tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Xà phòng tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Tẩy tế bào chết</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Nước rửa tay</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="block-item">
                    <div className="category-link">
                      <Link to="#">Làm sạch cơ thể</Link>
                    </div>
                    <ul className="megamenu-sub-items">
                      <li className="megamenu-sub-item">
                        <Link to="#">Sữa tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Xà phòng tắm</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Tẩy tế bào chết</Link>
                      </li>
                      <li className="megamenu-sub-item">
                        <Link to="#">Nước rửa tay</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <Link to="#">Chăm sóc da mặt</Link>
            </li>
            <li className="megamenu-item">
              <div className="submenu-content">
                <div className="block-main">submenu Chăm sóc sức khỏe</div>
              </div>
              <Link to="#">Chăm sóc sức khỏe</Link>
            </li>
            <li className="megamenu-item">
              <div className="submenu-content">
                <div className="block-main">submenu Chăm sóc trang điểm</div>
              </div>
              <Link to="#">Chăm sóc trang điểm</Link>
            </li>
            <li className="megamenu-item">
              <div className="submenu-content">
                <div className="block-main">submenu Chăm sóc tóc </div>
              </div>
              <Link to="#">Chăm sóc tóc</Link>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}

export default Header;
