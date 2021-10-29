import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';
import useLocationService from '../Services/LocationService';
import Loader from '../components/Loader';
import DraggableTimeline from '../components/planDetails/DraggableTimeline';
import TimelineElementPositionTypes from '../components/planDetails/TimelineElementPositionTypes';
import LocationDto from '../Common/Dto/LocationDto';

const useStyles = makeStyles({
  container: {
    maxWidth: '50vw',
    minWidth: '45vw',
    overflow: 'auto',
    height: '95vh',
  },
});

type MatchParams = {
  id: string
}

interface Props extends RouteComponentProps<MatchParams> {}

const PlansDetailsPage = ({ match }: Props) => {
  const classes = useStyles();
  const locationsService = useLocationService();
  const [locations, setLocations] = useState<LocationDto[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchListData = async () => {
      setIsLoading(true);
      const data = await locationsService.getAll(+match.params.id);
      setLocations(data);
      setIsLoading(false);
    };

    fetchListData();
  }, []);

  return (
    <>
      {isLoading
        ? <Loader />
        : (
          <div className={classes.container}>
            <DraggableTimeline data={locations} position={TimelineElementPositionTypes.Right} />
          </div>
        )}
    </>
  );
};

export default PlansDetailsPage;
