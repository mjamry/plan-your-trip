import React, { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { RouteComponentProps } from 'react-router-dom';
import {
  Paper, SpeedDial, SpeedDialAction,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';

import useLocationService from '../Services/LocationService';
import Loader from '../components/Loader';
import DraggableTimeline from '../components/planDetails/DraggableTimeline';
import LocationDto, { LocationEmpty } from '../Common/Dto/LocationDto';
import TimelineElementPositionType from '../Common/Dto/TimelineElementPositionTypes';
import MapView from '../components/MapView/MapView';
import { ModalStateAction, ModalTypes, useModalState } from '../State/ModalState';
import PlanDetails from '../components/planDetails/PlanDetails';
import useUserDataService from '../Services/UserDataService';
import usePlanService from '../Services/PlanService';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '1rem',
    width: '100%',
    height: '100%',
    paddingTop: '1rem',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  planLocations: {
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '1rem',
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
  const userService = useUserDataService();
  const planService = usePlanService();

  const planId: number = +match.params.id;

  useEffect(() => {
    const fetchPlanData = async () => {
      setIsLoading(true);
      const data = await locationsService.getAll(planId);
      setLocations(data);
      setIsLoading(false);
    };

    fetchPlanData();
  }, []);

  const handleAddNewItem = () => {
    dispatchModal({
      type: ModalStateAction.show,
      modalType: ModalTypes.addLocation,
      data: LocationEmpty,
    });
  };

  const handleSharePlan = async () => {
    const usersToShare = await userService.getUsersToShareWith();
    const shares = await planService.getShare(planId);

    dispatchModal({
      type: ModalStateAction.show,
      modalType: ModalTypes.sharePlan,
      data: { usersToShare, shares, planId },
    });
  };

  const actions = [
    { icon: <AddIcon />, name: 'Add new location', onClick: () => handleAddNewItem() },
    // eslint-disable-next-line no-console
    { icon: <ShareIcon />, name: 'Share plan', onClick: () => handleSharePlan() },
  ];

  return (
    <>
      {isLoading
        ? <Loader />
        : (
          <>
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: 'absolute', bottom: 16, right: 16 }}
              icon={<MenuIcon />}
            >
              {actions.map((a) => (
                <SpeedDialAction
                  className="speedDialAction"
                  key={a.name}
                  icon={a.icon}
                  tooltipTitle={a.name}
                  onClick={a.onClick}
                />
              ))}
            </SpeedDial>
            <div className={classes.container}>
              <PlanDetails />
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
