import React, { useState, useEffect } from 'react';
import L, { LeafletMouseEvent } from 'leaflet';
import useCoordinatesValidator from '../../Common/CoordinatesValidator';
import LocationDto from '../../Common/Dto/LocationDto';

export type MapViewOptions = {
  draggable: boolean;
  style: string;
  canAddMarker: boolean;
  title: string;
  autoPan: boolean,
  onCoordinatesUpdated?: (data: L.LatLng) => void;
}

type Marker = {
  id: number;
  marker: L.Marker;
}

type Props = {
  locations: LocationDto[];
  selectedLocation?: LocationDto;
  options?: MapViewOptions;
  mapId: string;
}

const defaultOptions: MapViewOptions = {
  draggable: false,
  style: 'locations-map-view',
  canAddMarker: false,
  title: '',
  autoPan: true,
};

const MapView = (props: Props) => {
  const {
    mapId, locations, selectedLocation, options = defaultOptions,
  } = props;
  const [visibleMarkers, setVisibleMarkers] = useState<Marker[]>([]);
  const [mapObject, setMapObject] = useState<L.Map>();
  const coordinateValidator = useCoordinatesValidator();

  const setupMarker = (location: LocationDto, coordinates: L.LatLngExpression) => {
    const marker = L.marker(coordinates, { ...options, title: location.name })
      .addTo(mapObject!)
      .bindPopup(location.name);
    // .openPopup()

    if (options.draggable) {
      marker.on('dragend', () => {
        if (options.onCoordinatesUpdated) {
          options.onCoordinatesUpdated(marker.getLatLng());
        }
      });
    }

    return marker;
  };

  const showSelectedLocation = () => {
    if (selectedLocation && mapObject) {
      const locationMarker = visibleMarkers.find((el) => el.id === selectedLocation.id);
      if (locationMarker) {
        mapObject.flyTo([selectedLocation.coordinates.lat, selectedLocation.coordinates.lon], 10);
        locationMarker.marker.bindPopup(selectedLocation.name).openPopup();
      }
    }
  };

  useEffect(() => {
    const map = L.map(mapId,
      {
        zoom: 5,
        center: [51.505, -0.09],
      });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoibWphbXJ5IiwiYSI6ImNqcmdtc3JnZjAyYTA0YXFxMDRkMG93MjYifQ.u8XNxfJHLLy3Vnbo3R40sA',
    }).addTo(map);

    setMapObject(map);
  }, []);

  useEffect(() => {
    if (mapObject) {
      visibleMarkers.forEach((location) => {
        location.marker.remove();
      });

      const markers: Marker[] = [];
      locations.forEach((location) => {
        if (coordinateValidator.isValid(location.coordinates.lat)
            && coordinateValidator.isValid(location.coordinates.lon)) {
          const coordinates: L.LatLngExpression = [location.coordinates.lat,
            location.coordinates.lon];

          markers.push({
            marker: setupMarker(location, coordinates),
            id: location.id,
          });

          mapObject.setView(coordinates);
        }
      });

      setVisibleMarkers(markers);

      if (options.canAddMarker) {
        mapObject.on('click', (e: LeafletMouseEvent) => {
          if (options.onCoordinatesUpdated) {
            options.onCoordinatesUpdated(e.latlng);
          }
        });
      }
    }
  }, [mapObject, locations]);

  useEffect(() => {
    showSelectedLocation();
  }, [selectedLocation]);

  return (
    <div id={mapId} className={options.style} />
  );
};

export default MapView;
