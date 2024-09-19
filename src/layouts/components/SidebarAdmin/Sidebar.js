import { NavLink } from 'react-router-dom';
import logo from '~/assets/image/logo.png';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import BarChartIcon from '@mui/icons-material/BarChart';

import './Sidebar.scss';

function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink to="/admin" className="logo-link">
        <Avatar src={logo} alt="logo" className="logo-avatar" />
        <Typography variant="h6" className="logo-text">
          Orange
        </Typography>
      </NavLink>

      <List component="nav" className="menu">
        <NavLink to="/admin/dashboard" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon className="menu-icon" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" className="menu-text" />
          </ListItem>
        </NavLink>

        <NavLink to="/admin/users-management" className="menu-item">
          <ListItem button>
            <ListItemIcon>
              <PersonIcon className="menu-icon" />
            </ListItemIcon>
            <ListItemText primary="Users Management" className="menu-text" />
          </ListItem>
        </NavLink>

        <NavLink to="/admin/products-management" className="menu-item">
          <ListItem button>
            <ListItemIcon>
              <InventoryIcon className="menu-icon" />
            </ListItemIcon>
            <ListItemText primary="Products Management" className="menu-text" />
          </ListItem>
        </NavLink>

        <NavLink to="/admin/tickets-management" className="menu-item">
          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberIcon className="menu-icon" />
            </ListItemIcon>
            <ListItemText primary="Tickets Management" className="menu-text" />
          </ListItem>
        </NavLink>

        <NavLink to="/admin/statistical" className="menu-item">
          <ListItem button>
            <ListItemIcon>
              <BarChartIcon className="menu-icon" />
            </ListItemIcon>
            <ListItemText primary="Statistical" className="menu-text" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
}

export default Sidebar;
