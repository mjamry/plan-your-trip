import React, { useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import GetAppIcon from '@mui/icons-material/GetApp';
import { AddBox } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Table from '../components/Table/Table';
import { usePlansState, PlansStateActions } from '../State/PlansState';
import useLocationService from '../Services/LocationService';
import LocationsMapView from '../components/MapView/LocationsMapView';
import useGpxFileDownloader from '../Services/GpxFileGenerator/GpxFileDownloader';
import RatingButton from '../components/RatingButton';
import LocationDto, { LocationEmpty } from '../Common/Dto/LocationDto';
import { locationsState } from '../State/LocationsState';
import { ModalTypes, showModalState } from '../State/ModalState';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    margin: '10px',
  },
  locationsContainer: {
    margin: '10px',
    marginRight: '0',
    flex: '0 1 calc(66% - 1em)',
    overflow: 'auto',
    height: '90vh',
  },
  mapContainer: {
    flex: '0 1 calc(34% - 1em)',
    margin: '10px',
  },
  locationImage: {
    maxWidth: '100px',
    maxHeight: '100px',
  },
});

type RouteParams = {
    planId: string
}

function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState<LocationDto>();
  const [isLoading, setIsLoading] = useState(false);
  const locations = useRecoilValue(locationsState);
  const { dispatch: dispatchPlans } = usePlansState();
  const showModal = useSetRecoilState(showModalState);
  const locationsService = useLocationService();
  const classes = useStyles();
  const gpxFileDownloader = useGpxFileDownloader();
  const { planId } = useParams<RouteParams>();

  useEffect(() => {
    dispatchPlans({
      type: PlansStateActions.selectPlan,
      data: +planId!,
    });

    const fetchPlanData = async () => {
      setIsLoading(true);
      await locationsService.getAll(+planId!);
      setIsLoading(false);
    };

    fetchPlanData();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.locationsContainer}>
        <Table
          columns={[
            {
              headerName: '',
              field: 'image',
              renderCell: (params: any) => <img src={params.row.image} className={classes.locationImage} alt="" />,
            },
            {
              headerName: 'Name',
              field: 'name',
            },
            {
              headerName: 'Description',
              field: 'description',
              flex: 3,
            },
            {
              headerName: 'Rating',
              field: 'rating',
              type: 'number',
              minWidth: 150,
              renderCell: (params: any) => <RatingButton value={params.row.rating!} readOnly />,
            },
            {
              headerName: 'Coordinates',
              field: 'coordinates',
              type: 'number',
              minWidth: 150,
              valueFormatter: (params: any) => `${params.value.lat}, ${params.value.lon}`,
            },
          ]}
          onRowClick={((location: LocationDto) => setSelectedLocation(location))}
          data={locations}
          edit={(location: LocationDto) => showModal({
            type: ModalTypes.editLocation,
            data: location,
          })}
          remove={(location: LocationDto) => showModal({
            type: ModalTypes.removeLocation,
            data: location,
          })}
          isLoading={isLoading}
          customActions={[
            {
              icon: <GetAppIcon />,
              title: 'Download',
              action: () => gpxFileDownloader.download(locations),
            },
            {
              icon: <AddBox />,
              title: 'add new item',
              action: () => showModal({
                type: ModalTypes.addLocation,
                data: LocationEmpty,
              }),
            },
          ]}
        />
      </div>
      <div className={classes.mapContainer}>
        <LocationsMapView
          locations={locations}
          selectedLocation={selectedLocation}
        />
      </div>
    </div>
  );
}

export default LocationsPage;
