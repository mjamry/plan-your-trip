import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import Table from '../components/Table';
import { useLocationsState } from '../State/LocationsState';
import { useModalState, ModalStateAction, ModalTypes } from '../State/ModalState';
import { useListsState, ListsStateActions } from '../State/ListsState';
import useLocationService from '../Services/LocationService';
import LocationsMapView from '../components/MapView/LocationsMapView';
import GpxFileDownloader from '../Common/GpxFileDownloader';
import { Location } from '../Common/Dto/Location';
import RatingButton from '../components/RatingButton';

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
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const [isLoading, setIsLoading] = useState(false);
  const { state: locationsState } = useLocationsState();
  const { dispatch: dispatchModal } = useModalState();
  const { dispatch: dispatchLists } = useListsState();
  const locationsService = useLocationService();
  const classes = useStyles();

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
            title={`You have ${locationsState.locations.length} locations`}
            columns={[
              {
                title: '',
                field: 'image',
                render: (location: Location) => <img src={location.image} className={classes.locationImage} alt="" />,
                // this is a hack to undo auto-calculation of columns width
                // @ts-ignore
                width: null,
              },
              { title: 'Name', field: 'name' },
              { title: 'Description', field: 'description' },
              {
                title: 'Rating',
                field: 'rating',
                type: 'numeric',
                render: (location: Location) => <RatingButton value={location.rating} readOnly />,
              },
              {
                title: 'Coordinates',
                field: 'coordinates',
                render: (location: Location) => `${location.coordinates.lat}, ${location.coordinates.lon}`,
              },
            ]}
            onRowClick={((e: any, location: Location) => setSelectedLocation(location))}
            data={locationsState.locations}
            add={() => dispatchModal({
              type: ModalStateAction.show,
              modalType: ModalTypes.addNewLocationSelect,
              data: undefined,
            })}
            edit={(location: Location) => dispatchModal({
              type: ModalStateAction.show,
              modalType: ModalTypes.editLocation,
              data: location,
            })}
            remove={(location: Location) => dispatchModal({
              type: ModalStateAction.show,
              modalType: ModalTypes.removeLocation,
              data: location,
            })}
            isLoading={isLoading}
            customActions={[
              {
                icon: () => <GetAppIcon />,
                tooltip: 'Download',
                isFreeAction: true,
                onClick: () => GpxFileDownloader.download(locationsState.locations),
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
