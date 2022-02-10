import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';

import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TransportTypeSelector from './TransportTypeSelector';
import TransportType from '../../Common/Dto/TransportType';
import LocationDto from '../../Common/Dto/LocationDto';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    cursor: 'move',
    overflow: 'hidden',
  },
  locationImage: {
    width: '5rem',
    height: '5rem',
    objectFit: 'cover',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  description: {
    textAlign: 'justify',
    maxHeight: '8rem',
    maxWidth: '20rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  dataContainer: {
    margin: '5px',
    maxHeight: '100px',
  },
  routeDetailsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'column',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

type Props = {
  location: LocationDto;
  routeDetails: any;
  position: any;
}

function TimelineElement(props: Props) {
  const { location, routeDetails, position } = props;
  const [transportType, setTransportType] = useState<TransportType>(TransportType.walk);
  const classes = useStyles(position);

  return (
    <TimelineItem>
      <TimelineOppositeContent className={classes.routeDetailsContainer}>
        <Typography variant="body2" color="textSecondary">
          Travel by
          {' '}
          {Object.keys(TransportType)[transportType]}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          for
          {' '}
          {routeDetails.distance}
          {' '}
          in
          {' '}
          {routeDetails.time}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <TransportTypeSelector
          position={position}
          onSelect={(type: TransportType) => setTransportType(type)}
        />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Paper elevation={1} className={classes.paper}>
          {location.image
          && <img src={location.image} className={classes.locationImage} alt={location.name} />}
          <div className={classes.dataContainer}>
            <Typography variant="h6" component="h6">
              {location.name}
            </Typography>
          </div>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  );
}

export default TimelineElement;
