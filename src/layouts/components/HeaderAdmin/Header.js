import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu as MuiMenu, MenuItem, Badge, Avatar, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import authService from '~/services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutAdminSuccess } from '~/redux/authSlice';

const MENU_ITEMS = [
  {
    icon: <LanguageIcon />,
    title: 'Vietnamese',
    children: {
      title: 'Languages',
      data: [
        { type: 'language', code: 'en', title: 'English' },
        { type: 'language', code: 'vi', title: 'Tiếng Việt' },
      ],
    },
  },
];

function HeaderAdmin() {
  const currentAdmin = useSelector((state) => state.auth.login?.currentAdmin);
  const accessToken = useSelector((state) => state.auth.login?.accessToken_admin);
  const id = currentAdmin?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      if (accessToken) {
        authService.logOut(dispatch, id, navigate, accessToken);
      } else {
        dispatch(logOutAdminSuccess());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMenuChange = (menuItem) => {
    if (menuItem.title === 'Log out') {
      handleLogout();
    }
  };

  const userMenu = [
    { icon: <AccountCircleIcon />, title: 'View profile', to: '/@tho' },
    { icon: <SettingsIcon />, title: 'Settings', to: '/settings' },
    ...MENU_ITEMS,
    { icon: <LogoutIcon />, title: 'Log out', to: '/admin/login', separate: true },
  ];

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ background: 'rgb(49, 172, 255)' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
          Welcome Admin
        </Typography>

        <IconButton size="large" sx={{ color: '#fff' }}>
          <Badge badgeContent={11} color="info">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton size="large" onClick={handleClick} color="inherit">
          <Avatar
            alt="Admin"
            src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/42a81079b5885e152707b170d63ba2df~c5_100x100.jpeg?x-expires=1685955600&x-signature=Q86T1O7WvBZ%2FSMrLLyqsJqYAxBo%3"
          />
        </IconButton>

        <MuiMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          {userMenu.map((menuItem, index) => (
            <MenuItem key={index} onClick={() => handleMenuChange(menuItem)}>
              {menuItem.icon}
              <Typography sx={{ marginLeft: '10px' }}>{menuItem.title}</Typography>
            </MenuItem>
          ))}
        </MuiMenu>

        <Typography variant="body1" sx={{ marginLeft: '10px', color: '#fff' }}>
          Thọ
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderAdmin;
