import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import GetAppIcon from '@mui/icons-material/GetApp';
import { AddBox } from '@mui/icons-material';
import Table from '../components/Table/Table';
import { useLocationsState } from '../State/LocationsState';
import { useModalState, ModalStateAction, ModalTypes } from '../State/ModalState';
import { useListsState, ListsStateActions } from '../State/ListsState';
import useLocationService from '../Services/LocationService';
import LocationsMapView from '../components/MapView/LocationsMapView';
import useGpxFileDownloader from '../Services/GpxFileGenerator/GpxFileDownloader';
import RatingButton from '../components/RatingButton';
import LocationDto, { LocationEmpty } from '../Common/Dto/LocationDto';

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

type MatchParams = {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {}

const LocationsPage = ({ match }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationDto>();
  const [isLoading, setIsLoading] = useState(false);
  const { state: locationsState } = useLocationsState();
  const { dispatch: dispatchModal } = useModalState();
  const { dispatch: dispatchLists } = useListsState();
  const locationsService = useLocationService();
  const classes = useStyles();
  const gpxFileDownloader = useGpxFileDownloader();

  const validateListId = (id: number) => id; // null if incorrect

  useEffect(() => {
    const listId = validateListId(+match.params.id);

    dispatchLists({
      type: ListsStateActions.selectList,
      data: listId,
    });

    const fetchListData = async () => {
      setIsLoading(true);
      await locationsService.getAll(listId);
      setIsLoading(false);
    };

    fetchListData();
  }, []);

  return (
    <>
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
            data={locationsState.locations}
            edit={(location: LocationDto) => dispatchModal({
              type: ModalStateAction.show,
              modalType: ModalTypes.editLocation,
              data: location,
            })}
            remove={(location: LocationDto) => dispatchModal({
              type: ModalStateAction.show,
              modalType: ModalTypes.removeLocation,
              data: location,
            })}
            isLoading={isLoading}
            customActions={[
              {
                icon: <GetAppIcon />,
                title: 'Download',
                action: () => gpxFileDownloader.download(locationsState.locations),
              },
              {
                icon: <AddBox />,
                title: 'add new item',
                action: () => dispatchModal({
                  type: ModalStateAction.show,
                  modalType: ModalTypes.addLocation,
                  data: LocationEmpty,
                }),
              },
            ]}
          />
        </div>
        <div className={classes.mapContainer}>
          <LocationsMapView
            locations={locationsState.locations}
            selectedLocation={selectedLocation}
          />
        </div>
      </div>
    </>
  );
};

export default withRouter(LocationsPage);
