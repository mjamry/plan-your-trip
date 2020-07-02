import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import Table from './../components/Table'
import { useLocationsState, LocationsStateActions } from './../State/LocationsState'
import { useModalState, ModalStateAction, ModalTypes } from './../State/ModalStateProvider'
import useLocationService from './../Services/LocationService'
import LocationsMapView from './../components/MapView/LocationsMapView'
import { withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '90vw',
        height: '90vh',
        alignItems: 'center'
    }
}

const LocationsPage = ({match}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [{locations}, dispatchlocations] = useLocationsState(); 
    const [{}, dispatchModal] = useModalState();
    const locationsService = useLocationService();

    useEffect(()=>
    {
        //validate
        const id = match.params.id;
        const fetchListData = async () => {
            await locationsService.getAll(id);
        }

        setIsLoading(true);
        fetchListData();
        setIsLoading(false);
    }, [])

    return (<>
    {isLoading 
    ? <CircularProgress />
    : <div className="app-content-container">
        <div className="app-locations-view">
            <Table
                title={`You have ${locations.length} locations`}
                columns={[
                    {title: "Name", field: "name"},
                    {title: "Description", field: "description", cellStyle: {
                        maxLength: 100
                    },},
                    {title: "Attractivness", field: "attractivness", type: "numeric", render: location => location.attractivness},
                    {title: "Coordinates", field: "coordinates", render: location => `${location.coordinates.lat}, ${location.coordinates.lon}`},
                ]}
                onRowClick={((evt, location) => console.log(location.id))}
                data={locations}
                add={() => dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.addNewLocationSelect})}
                edit={(location) => dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.editLocation, data: location})}
                delete={(location) => dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.removeLocation, data: location})}
            />
        </div>
        <div className="app-map-view">
            <LocationsMapView />
        </div>
    </div>
    }
    </>)
}

export default withRouter(LocationsPage);