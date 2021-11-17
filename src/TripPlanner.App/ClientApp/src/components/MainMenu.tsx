import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
// import Drawer from '@mui/material/Drawer';
// import Toolbar from '@mui/material/Toolbar';
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
import { Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles({
  drawer: {
    zIndex: 100,
  },
  drawerPaper: {
  },
  drawerContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    height: '100vh',
    paddingBottom: '4rem',
    boxSizing: 'border-box',
  },
  topMenuItems: {
    flexGrow: 1,
  },
  bottomMenuItems: {

  },
  collapsedButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexJustifyContent: 'end',
    paddingLeft: '7px',
    // position: 'absolute',
    // top: '200px',
    // right: '-20px',
    // zIndex: 101,
  },
  collapseIcon: {
    transform: 'rotate(90deg)',
  },
});

const menuItemPosition = {
  top: 'top',
  bottom: 'bottom',
};

const MainMenu = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

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

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (

    <Collapse
      collapsedSize="3.5rem"
      orientation="horizontal"
      in={!isCollapsed}
      timeout="auto"
    >
      <div className={classes.drawerContainer}>
        <div className={classes.collapsedButtonContainer}>
          <IconButton onClick={toggleCollapse}>
            { isCollapsed ? <MenuIcon /> : <ExpandMoreIcon className={classes.collapseIcon} />}
          </IconButton>
        </div>
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

    </Collapse>
  );
};

export default MainMenu;
