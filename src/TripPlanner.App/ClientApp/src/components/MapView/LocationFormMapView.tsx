import React from 'react';
import LocationDto from '../../Common/Dto/LocationDto';
import MapView from './MapView';

type Props = {
    location: LocationDto;
    onCoordinatesUpdated: () => void;
}

const LocationFormMapView = (props: Props) => {
  const { location, onCoordinatesUpdated } = props;

  const locations = [location];
  const options = {
    draggable: true,
    autoPan: true,
    onCoordinatesUpdated,
    style: 'location-form-map-view',
    canAddMarker: true,
    title: 'click to add/move marker',
  };

  return (
    <MapView locations={locations} selectedLocation={location} options={options} />
  );
};

export default LocationFormMapView;
