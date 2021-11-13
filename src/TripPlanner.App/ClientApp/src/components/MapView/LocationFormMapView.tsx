import React from 'react';
import L from 'leaflet';
import LocationDto from '../../Common/Dto/LocationDto';
import MapView, { MapViewOptions } from './MapView';

type Props = {
    location: LocationDto;
    onCoordinatesUpdated: (coordinates: L.LatLng) => void;
}

const LocationFormMapView = (props: Props) => {
  const { location, onCoordinatesUpdated } = props;

  const locations = [location];
  const options: MapViewOptions = {
    draggable: true,
    autoPan: true,
    onCoordinatesUpdated,
    style: 'location-form-map-view',
    canAddMarker: true,
    title: 'click to add/move marker',
  };

  return (
    <MapView locations={locations} selectedLocation={location} options={options} mapId="locationsFormMapId" />
  );
};

export default LocationFormMapView;
