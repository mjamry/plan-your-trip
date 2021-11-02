import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import TransportTypeSelector from './TransportTypeSelector';
import TransportType from '../../Common/Dto/TransportType';
import LocationDto from '../../Common/Dto/LocationDto';

const DESCRIPTION_LENGTH = 100;

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    cursor: 'move',
  },
  locationImage: {
    maxWidth: '100px',
  },
  description: {
    textAlign: 'justify',
    maxHeight: '80px',
    maxWidth: '200px',
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
  },
});

// const useStyles = (position) => makeStyles((theme) => (
//   position === TimelineElementPositionTypes.Left
//     ? {
//       ...styles,
//       locationImage: {
//         ...styles.locationImage,
//         borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`,
//       },
//       dataContainer: {
//         ...styles.dataContainer,
//         textAlign: 'left',
//       },
//     }
//     : {
//       ...styles,
//       paper: {
//         ...styles.paper,
//         flexFlow: 'row-reverse',
//       },
//       locationImage: {
//         ...styles.locationImage,
//         borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
//       },
//     }
// ));

type Props = {
  location: LocationDto;
  routeDetails: any;
  position: any;
}

const TimelineElement = (props: Props) => {
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
            <Tooltip title={location.description}>
              <Typography variant="body2" className={classes.description}>
                {location.description.substring(0, DESCRIPTION_LENGTH)}
              </Typography>
            </Tooltip>
          </div>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  );
};

export default TimelineElement;
