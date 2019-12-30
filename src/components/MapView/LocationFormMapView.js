import React from 'react';
import MapView from './MapView'

const LocationFormMapView = ({location, onCoordinatesUpdated}) => {
    var locations = [location]
    var options = {
        draggable: true,
        autoPan: true,
        onCoordinatesUpdated: onCoordinatesUpdated,
        style: "location-form-map-view"
    }

    return (
        <MapView locations={locations} selectedLocation={location} options={options}/>
    )
}

export default LocationFormMapView;