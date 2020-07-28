import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'

import useLocationService from './../Services/LocationService'
import Loader from './../components/Loader'
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import FlightIcon from '@material-ui/icons/Flight';

//transport selector and
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: '6px 16px',
      display: 'flex'
    },
    secondaryTail: {
      backgroundColor: theme.palette.secondary.main,
    },   
    locationImage: {
        maxWidth: '100px',
        maxHeight: '100px',
        margin: '0 5px',
    },
    description: {
        textAlign: 'justify',
    },
    container: {
        width: '50vw',
        overflow: 'auto',
        height: '95vh',
    },
    //transport
    root: {
        height: 380,
        transform: 'translateZ(0px)',
        flexGrow: 1,
      },
    speedDial: {
        position: 'absolute',
        
        top: '-10px',
        left: '-15px',
        margin: '5px',
    },
    separatorContainer: {
        position: 'relative',
        height: '20px',
        width: '20px',
        margin: '5px',
    },
    speedDialAction: {
        border: '1px solid red',
    },
}));

const actions = [
    { icon: <DirectionsWalkIcon />, name: 'Walk' },
    { icon: <DirectionsBikeIcon />, name: 'Bike' },
    { icon: <DirectionsCarIcon />, name: 'Car' },
    { icon: <DirectionsBusIcon />, name: 'Bus' },
    { icon: <DirectionsBoatIcon />, name: 'Boat' },
    { icon: <FlightIcon />, name: 'Plane' },
  ];

const TransportSelector = () => {
    
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);
    const [transportTypeIcon, setTransportTypeIcon] = useState(<DirectionsWalkIcon />)
  
    const handleVisibility = () => {
      setHidden((prevHidden) => !prevHidden);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const selectTransportType = (icon) => {
        setTransportTypeIcon(icon);
        handleClose();
    }

    return (<SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        hidden={hidden}
        icon={transportTypeIcon}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="right"
        FabProps={{size: "small"}}
      >
        {actions.filter((action) => action.icon !== transportTypeIcon)
                .map((action) => (
                    <SpeedDialAction
                        className="speedDialAction"
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => selectTransportType(action.icon)}
                    />
                    ))}
      </SpeedDial>)
}

const PlansDetailsPage = ({match}) => {
    const classes = useStyles();
    const locationsService = useLocationService();
    const [locations, setLocations] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>
    {
        const fetchListData = async () => {
            setIsLoading(true);
            const data = await locationsService.getAll(match.params.id);
            setLocations(data);
            setIsLoading(false);
        }
        
        fetchListData();
    }, [])

    const renderTransportSelection = () => {
        
    }

    const renderLocations = () => {
        return locations.map((location, index) => 
            (<TimelineItem>
                <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                        25 km
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        1h 35min
                    </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <div className={classes.separatorContainer}>
                        <TransportSelector />
                    </div>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={1} className={classes.paper}>
                        {location.image && <img src={location.image} className={classes.locationImage}/>}
                        <div>
                            <Typography variant="h6" component="h1">
                                {location.name}
                            </Typography>
                            <Typography variant="body2" className={classes.description}>{location.description}</Typography>
                        </div>
                    </Paper>
                </TimelineContent>
            </TimelineItem>)
        )
    }

    return (
    <>
        {isLoading 
        ? <Loader /> 
        : <div className={classes.container}>
            <Timeline align="alternate">
            {renderLocations()}
            </Timeline>
        </div>}
    </>);
}

export default PlansDetailsPage;