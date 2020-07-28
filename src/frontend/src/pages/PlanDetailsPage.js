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

import TransportTypeSelector from '../components/planDetails/TransportTypeSelector'


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
}));

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
                    
                        <TransportTypeSelector />
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