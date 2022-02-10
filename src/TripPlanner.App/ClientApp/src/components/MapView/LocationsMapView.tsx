import React from 'react';
import LocationDto from '../../Common/Dto/LocationDto';
import MapView from './MapView';

type Props = {
    locations: LocationDto[];
    selectedLocation?: LocationDto;
}

function LocationsMapView(props: Props) {
  const { locations, selectedLocation } = props;

  return (
    <MapView locations={locations} selectedLocation={selectedLocation} mapId="mainMapId" />
  );
}

export default LocationsMapView;
