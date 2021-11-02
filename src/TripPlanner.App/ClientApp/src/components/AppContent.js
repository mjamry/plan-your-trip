import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    content: {
        marginLeft: '180px',
    }
}

const AppContent = ({children, classes}) => {
    return (
        <div className={classes.content}>
            {children}
        </div>
    )
}

export default withStyles(styles)(AppContent)