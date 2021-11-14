import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExploreIcon from '@mui/icons-material/Explore';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { useHistory } from 'react-router-dom';

const drawerWidth = 180;

const useStyles = makeStyles({
  drawer: {
    zIndex: 100,
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  topMenuItems: {
    flexGrow: 1,
  },
  bottomMenuItems: {

  },
});

const menuItemPosition = {
  top: 'top',
  bottom: 'bottom',
};

const MainMenu = () => {
  const classes = useStyles();
  const history = useHistory();

  const getMenuItems = () => [
    {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      position: menuItemPosition.top,
      action: () => history.push('/'),
    },
    {
      title: 'Locations',
      icon: <LocationOnIcon />,
      position: menuItemPosition.top,
      action: () => history.push('/locations'),
    },
    {
      title: 'Plans',
      icon: <ExploreIcon />,
      position: menuItemPosition.top,
      action: () => history.push('/plans'),
    },
    {
      title: 'Settings',
      icon: <SettingsIcon />,
      position: menuItemPosition.bottom,
      action: () => history.push('/settings'),
    },
    {
      title: 'About',
      icon: <InfoIcon />,
      position: menuItemPosition.bottom,
      action: () => history.push('/about'),
    },
  ];

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List className={classes.topMenuItems}>
          {
            getMenuItems()
              .filter((item) => item.position === menuItemPosition.top)
              .map((menuItem) => (
                <ListItem button key={menuItem.title} onClick={menuItem.action}>
                  <ListItemIcon>{menuItem.icon}</ListItemIcon>
                  <ListItemText primary={menuItem.title} />
                </ListItem>
              ))
          }
        </List>
        <List className={classes.bottomMenuItems}>
          {
            getMenuItems()
              .filter((item) => item.position === menuItemPosition.bottom)
              .map((menuItem) => (
                <ListItem button key={menuItem.title} onClick={menuItem.action}>
                  <ListItemIcon>{menuItem.icon}</ListItemIcon>
                  <ListItemText primary={menuItem.title} />
                </ListItem>
              ))
          }
        </List>
      </div>
    </Drawer>
  );
};

export default MainMenu;
