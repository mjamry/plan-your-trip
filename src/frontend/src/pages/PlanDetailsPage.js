import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'

import useLocationService from './../Services/LocationService'
import Loader from './../components/Loader'
import Timeline from '@material-ui/lab/Timeline';
import TimelineElement from './../components/planDetails/TimelineElement'
import TimelineElementPositionTypes from './../components/planDetails/TimelineElementPositionTypes'

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: '50vw',
        minWidth: '45vw',
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
        return locations.map((location, index) => (
            <TimelineElement 
                position={index % 2 == 0 ? TimelineElementPositionTypes.Left : TimelineElementPositionTypes.Right} 
                location={location} 
                routeDetails={{
                    distance: `${Math.round(Math.random()*10*index)}km`, 
                    time: `${Math.round(Math.random()*index)}h ${Math.round(Math.random()*60)}min`
                }}
                key={location.name} 
            />
    ))}

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