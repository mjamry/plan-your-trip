import React from 'react';
import {useLocationsState} from '../../State/LocationsState'
import MapView from './MapView'

const LocationsMapView = () => {
    const [{locations, locationSelectedOnMap}] = useLocationsState();

    return (
        <MapView locations={locations} selectedLocation={locationSelectedOnMap} />
    )
}

export default LocationsMapView;