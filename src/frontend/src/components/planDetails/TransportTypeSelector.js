
import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TransportTypes from './../../Models/TransportTypes'
import TimelineElementPositionTypes from './TimelineElementPositionTypes'

import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import FlightIcon from '@material-ui/icons/Flight';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const useStyles = makeStyles((theme) => ({
    speedDialRight: {
        position: 'absolute',
        top: '-25px',
        left: '-15px',
        margin: '5px',
    },
    speedDialLeft: {
        position: 'absolute',
        top: '-25px',
        right: '-15px',
        margin: '5px',
    },
    container: {
        position: 'relative',
        height: '20px',
        width: '20px',
        margin: '5px',
    },
    speedDialAction: {
    },
}));

const transportOptions = [
    { icon: <DirectionsWalkIcon />, name: 'Walk', type: TransportTypes.Walk },
    { icon: <DirectionsBikeIcon />, name: 'Bike', type: TransportTypes.Bike },
    { icon: <DirectionsCarIcon />, name: 'Car', type: TransportTypes.Car },
    { icon: <DirectionsBusIcon />, name: 'Bus', type: TransportTypes.Bus },
    { icon: <DirectionsBoatIcon />, name: 'Boat', type: TransportTypes.Boat},
    { icon: <FlightIcon />, name: 'Plane', type: TransportTypes.Plane },
  ];

const TransportTypeSelector = ({position, onSelect}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [selectedTransportType, setSelectedTransportType] = useState(TransportTypes.Walk)
    position = position || TimelineElementPositionTypes.Right;
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const selectTransportType = (type) => {
        setSelectedTransportType(type);
        onSelect(type);
        handleClose();
    }

    return (
        <div className={classes.container}>
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                className={position === TimelineElementPositionTypes.Right ? classes.speedDialRight : classes.speedDialLeft}
                hidden={hidden}
                icon={transportOptions.filter(option => option.type === selectedTransportType)[0].icon}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction={position}
                FabProps={{size: "small"}}
            >
        {transportOptions
            .filter((transportOption) => transportOption.type !== selectedTransportType)
            .map((transportOption) => (
                <SpeedDialAction
                    className="speedDialAction"
                    key={transportOption.name}
                    icon={transportOption.icon}
                    tooltipTitle={transportOption.name}
                    onClick={() => selectTransportType(transportOption.type)}
                />
                ))}
      </SpeedDial></div>)
}

export default TransportTypeSelector;