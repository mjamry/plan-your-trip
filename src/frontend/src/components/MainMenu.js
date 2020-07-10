import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ExploreIcon from '@material-ui/icons/Explore';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';

import {withRouter} from 'react-router-dom'
const drawerWidth = 180;

const styles = {
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
        height: '100vh'
    },
    topMenuItems: {
        flexGrow: 1
    },
    bottomManuItems: {

    }
}

const menuItemPosition = {
    top: 'top',
    bottom: 'bottom'
}

const MainMenu = ({classes, history}) => {

    const getMenuItems = () => {
        return [
            {
                title: 'Locations',
                icon: <LocationOnIcon />,
                position: menuItemPosition.top,
                action: () => history.push('/locations')
            },
            {
                title: 'Trips',
                icon: <ExploreIcon />,
                position: menuItemPosition.top,
                action: () => history.push('/trips')
            },
            {
                title: 'Settings',
                icon: <SettingsIcon />,
                position: menuItemPosition.bottom,
                action: () => history.push('/settings')
            },
            {
                title: 'About',
                icon: <InfoIcon />,
                position: menuItemPosition.bottom,
                action: () => history.push('/about')
            }
        ]
    }

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
                    getMenuItems().filter(item => item.position === menuItemPosition.top).map((menuItem, index) => (
                        <ListItem button key={menuItem.title} onClick={menuItem.action}>
                            <ListItemIcon>{menuItem.icon}</ListItemIcon>
                            <ListItemText primary={menuItem.title} />
                        </ListItem>)
                    )
                }
                </List>
                <List className={classes.bottomManuItems}>
                {
                    getMenuItems().filter(item => item.position === menuItemPosition.bottom).map((menuItem, index) => (
                        <ListItem button key={menuItem.title} onClick={menuItem.action}>
                            <ListItemIcon>{menuItem.icon}</ListItemIcon>
                            <ListItemText primary={menuItem.title} />
                        </ListItem>)
                    )
                }
                </List>
            </div>
        </Drawer>
    )
}

export default withRouter(withStyles(styles)(MainMenu))

