import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useState, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddLocationOutlinedIcon from '@mui/icons-material/AddLocationOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '~/axios';
import authService from '~/services/authService';
import { logOutSuccess } from '~/redux/authSlice';
import shopService from '~/services/shopService';
import { useCart } from '~/contexts/CartContext';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [shops, setShops] = useState([]);
  const { cart } = useCart();

  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = useSelector((state) => state.auth.login?.accessToken);
  const userId = currentUser?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(() => {
    try {
      if (accessToken) {
        authService.logOut(dispatch, userId, navigate, accessToken);
      } else {
        dispatch(logOutSuccess());
      }
    } catch (error) {
      console.error(error);
    }
  }, [accessToken, dispatch, navigate, userId]);

  const getAllShops = useCallback(async () => {
    const res = await shopService.getAllShops();
    setShops(res);
  }, []);

  useEffect(() => {
    getAllShops();
  }, [getAllShops]);

  const avatarUrl = useMemo(() => {
    return currentUser?.avatar.startsWith('http') ? currentUser?.avatar : `${baseUrl}/${currentUser?.avatar}`;
  }, [currentUser?.avatar]);

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
                    <Tooltip title="Cài đặt tài khoản">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ paddingLeft: 0 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                      >
                        <Avatar src={avatarUrl} sx={{ width: 32, height: 32 }} />
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
                      <Link
                        to="/account"
                        style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#000' }}
                      >
                        <Avatar /> Tài Khoản Của Tôi
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/account/address"
                        style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#000' }}
                      >
                        <Box className="icon-bg">
                          <AddLocationOutlinedIcon />
                        </Box>
                        Địa Chỉ Giao Hàng
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/account/orders"
                        style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#000' }}
                      >
                        <Box className="icon-bg">
                          <InventoryOutlinedIcon />
                        </Box>
                        Đơn Hàng
                      </Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Đăng Xuất
                    </MenuItem>
                  </Menu>
                  <div className="logged-in">Xin chào, {currentUser?.username}</div>
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
            <Link to="/cart" className="cart">
              <ShoppingCartIcon sx={{ marginRight: '8px' }} />
              <div className="content">
                <div className="text">Giỏ hàng</div>
                <div style={{ fontWeight: 700 }}>{cart?.items?.length || 0} Sản phẩm</div>
              </div>
            </Link>
          </Box>
        </div>
      </header>
      <div className="nav-sections">
        <div className="magemenu-menu">
          <ul className="megamenu-items">
            {shops.map((shop) => (
              <li key={shop.id} className="megamenu-item">
                <div className="submenu-content">
                  <div className="block-list">
                    {shop.Cosmetics.map((cosmetic) => (
                      <div key={cosmetic.id} className="block-item">
                        <div className="category-link">
                          <Link to="#">{cosmetic.name}</Link>
                        </div>
                        <ul className="megamenu-sub-items">
                          {cosmetic.categories.map((category) => (
                            <li key={category.id} className="megamenu-sub-item">
                              <Link to={`/categories/${category.name}`}>{category.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <Link to="#">{shop.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}

export default Header;
