import React, { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { RouteComponentProps } from 'react-router-dom';
import {
  Paper, SpeedDial, SpeedDialIcon, Typography,
} from '@mui/material';
import useLocationService from '../Services/LocationService';
import Loader from '../components/Loader';
import DraggableTimeline from '../components/planDetails/DraggableTimeline';
import LocationDto, { LocationEmpty } from '../Common/Dto/LocationDto';
import TimelineElementPositionType from '../Common/Dto/TimelineElementPositionTypes';
import MapView from '../components/MapView/MapView';
import { ModalStateAction, ModalTypes, useModalState } from '../State/ModalState';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '1rem',
    overflow: 'auto',
    width: '100%',
    height: '100%',
    paddingTop: '1rem',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  planDetails: {
    flexGrow: '0.25',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
      fontSize: '12pt',
    },
  },
  planDetailsRow: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: '2rem',
    paddingLeft: '1rem',
  },
  planLocations: {
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  planHeader: {
    padding: '1rem',
    marginBottom: '1rem',
  },
  map: {
    flexGrow: '2',
    overflow: 'hidden',
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  summary: {
    height: '3rem',
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: '1rem',
  },
}));

type MatchParams = {
  id: string
}

interface Props extends RouteComponentProps<MatchParams> {}

const PlansDetailsPage = ({ match }: Props) => {
  const classes = useStyles();
  const locationsService = useLocationService();
  const [locations, setLocations] = useState<LocationDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch: dispatchModal } = useModalState();

  useEffect(() => {
    const fetchListData = async () => {
      setIsLoading(true);
      const data = await locationsService.getAll(+match.params.id);
      setLocations(data);
      setIsLoading(false);
    };

    fetchListData();
  }, []);

  const handleAddNewItem = () => {
    dispatchModal({
      type: ModalStateAction.show,
      modalType: ModalTypes.addLocation,
      data: LocationEmpty,
    });
  };

  return (
    <>
      {isLoading
        ? <Loader />
        : (
          <>
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: 'absolute', bottom: 16, right: 16 }}
              icon={<SpeedDialIcon />}
              onClick={() => handleAddNewItem()}
            />
            <div className={classes.container}>
              <Paper className={classes.planDetails}>
                <div className={classes.planDetailsRow}>
                  <Typography variant="body2">Name: </Typography>
                  <Typography variant="h6">Visit in Poland</Typography>
                </div>
                <div className={classes.planDetailsRow}>
                  <Typography variant="body2">Start time: </Typography>
                  <Typography variant="h6">22/11/2022</Typography>
                </div>
                <div className={classes.planDetailsRow}>
                  <Typography variant="body2">End time: </Typography>
                  <Typography variant="h6">29/11/2022</Typography>
                </div>
                <div className={classes.planDetailsRow}>
                  <Typography variant="body2">Distance: </Typography>
                  <Typography variant="h6">150km</Typography>
                </div>
                <div className={classes.planDetailsRow}>
                  <Typography variant="body2">Travel time: </Typography>
                  <Typography variant="h6">12h 30min</Typography>
                </div>
              </Paper>
              <Paper className={classes.planLocations}>
                <DraggableTimeline data={locations} position={TimelineElementPositionType.right} />
              </Paper>
              <Paper className={classes.map}>
                <MapView locations={locations} mapId="planFormMapId" />
              </Paper>
            </div>
          </>
        )}
    </>
  );
};

export default PlansDetailsPage;
