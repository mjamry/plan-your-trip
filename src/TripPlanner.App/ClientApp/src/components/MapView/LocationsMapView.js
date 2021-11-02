import React from 'react';
import MapView from './MapView'

const LocationsMapView = ({locations, selectedLocation}) => {

    return (
        <MapView locations={locations} selectedLocation={selectedLocation} />
    )
}

export default LocationsMapView;