import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const styles = {
    loader: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
    }
}

const Loader = ({title, classes}) => {
    title = title || "Loading";
    return (
        <div className={classes.loader}>
            <CircularProgress />
            <Typography variant="h6">{title}</Typography>
        </div>
    )
}

export default withStyles(styles)(Loader)