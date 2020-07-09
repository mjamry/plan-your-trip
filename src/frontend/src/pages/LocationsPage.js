import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import Table from './../components/Table'
import { useLocationsState, LocationsStateActions } from './../State/LocationsState'
import { useModalState, ModalStateAction, ModalTypes } from './../State/ModalStateProvider'
import { useListsState, ListsStateActions } from './../State/ListsState'
import useLocationService from './../Services/LocationService'
import LocationsMapView from './../components/MapView/LocationsMapView'
import { withStyles } from '@material-ui/core/styles';

import RatingButton from './../components/RatingButton'

const styles = {
    container: {
        display: 'flex',
        overflow: 'hidden',
        height: '92vh',
    },
    locationsContainer: {
        margin: '10px',
        marginRight: '0',
        flex: '0 1 calc(66% - 1em)',
    },
    mapContainer: {
        flex: '0 1 calc(34% - 1em)',
        margin: '10px',
    },
    locationImage: {
        maxWidth: '100px',
        maxHeight: '100px',
    }
}

const LocationsPage = ({match, classes}) => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [{locations}, dispatchlocations] = useLocationsState(); 
    const [{}, dispatchModal] = useModalState();
    const locationsService = useLocationService();
    const [listState, dispatchLists] = useListsState();

    useEffect(()=>
    {
        const listId = validateListId(match.params.id);

        dispatchLists({
            type: ListsStateActions.selectList, 
            data: listId});

        const fetchListData = async () => {
            setIsLoading(true);
            await locationsService.getAll(listId);
            setIsLoading(false);
        }
        
        fetchListData();
    }, [])

    const validateListId = (id) => {
        return id; //null if incorrect
    }

    return (<>
    <div className={classes.container}>
        <div className={classes.locationsContainer}>
            <Table
                title={`You have ${locations.length} locations`}
                columns={[
                    {title: "", field: "image", render: location => <img src={location.image} className={classes.locationImage}/>, 
                        //this is a hack to undo autocalculation of columns width
                        width: null 
                    },
                    {title: "Name", field: "name"},
                    {title: "Description", field: "description"},
                    {title: "Rating", field: "rating", type: "numeric", render: location => <RatingButton value={location.rating} readOnly />},
                    {title: "Coordinates", field: "coordinates", render: location => `${location.coordinates.lat}, ${location.coordinates.lon}`},
                ]}
                onRowClick={((evt, location) => setSelectedLocation(location))}
                data={locations}
                add={() => dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.addNewLocationSelect})}
                edit={(location) => dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.editLocation, data: location})}
                delete={(location) => dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.removeLocation, data: location})}
                isLoading={isLoading}
            />
        </div>
        <div className={classes.mapContainer}>
            <LocationsMapView locations={locations} selectedLocation={selectedLocation}/>
        </div>
    </div>
    </>)
}

export default withRouter(withStyles(styles)(LocationsPage));