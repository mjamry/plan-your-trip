import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';

import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import FlightIcon from '@mui/icons-material/Flight';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import TransportType from '../../Common/Dto/TransportType';
import TimelineElementPositionType from '../../Common/Dto/TimelineElementPositionTypes';

const useStyles = makeStyles({
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
});

const transportOptions = [
  { icon: <DirectionsWalkIcon />, name: 'Walk', type: TransportType.walk },
  { icon: <DirectionsBikeIcon />, name: 'Bike', type: TransportType.bike },
  { icon: <DirectionsCarIcon />, name: 'Car', type: TransportType.car },
  { icon: <DirectionsBusIcon />, name: 'Bus', type: TransportType.bus },
  { icon: <DirectionsBoatIcon />, name: 'Boat', type: TransportType.boat },
  { icon: <FlightIcon />, name: 'Plane', type: TransportType.plane },
];

type Props = {
  position: any;
  onSelect: any;
}

const TransportTypeSelector = (props: Props) => {
  const { position, onSelect } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [hidden] = useState(false);
  const [
    selectedTransportType,
    setSelectedTransportType,
  ] = useState<TransportType>(TransportType.walk);

  const itemPosition = position || TimelineElementPositionType.right;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selectTransportType = (type: TransportType) => {
    setSelectedTransportType(type);
    onSelect(type);
    handleClose();
  };

  return (
    <div className={classes.container}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={itemPosition === TimelineElementPositionType.right
          ? classes.speedDialRight
          : classes.speedDialLeft}
        hidden={hidden}
        icon={transportOptions.filter((option) => option.type === selectedTransportType)[0].icon}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={itemPosition}
        FabProps={{ size: 'small' }}
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
      </SpeedDial>
    </div>
  );
};

export default TransportTypeSelector;
