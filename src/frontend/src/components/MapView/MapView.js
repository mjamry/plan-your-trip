import React, {useState, useEffect} from 'react';
import L from 'leaflet'
import CoordinatesValidator from '../../Common/CoordinatesValidator'

const defaultOptions = {
    draggable: false,
    style: "locations-map-view",
    canAddMarker: false,
    title:""
}

var MapView = ({locations, selectedLocation, options = defaultOptions}) => {
    const [visibleMarkers, setVisibleMarkers] = useState([]);
    const [mapObject, setMapObject] = useState(null);
    
    var setupMarker = (location, coordinates) => {
        var marker = L.marker(coordinates, {...options, title: location.name})
                            .addTo(mapObject)
                            .bindPopup(location.name)
                            //.openPopup()

        if(options.draggable){
            marker.on('dragend', (e) => {
                options.onCoordinatesUpdated(marker.getLatLng())
            })
        }

        return marker;
    }

    const showSelectedLocation = (selectedLocation) => {
        if(selectedLocation && mapObject)
        {
            var locationMarker = visibleMarkers.find(el => el.id === selectedLocation.id);
            if(locationMarker){
                mapObject.flyTo([selectedLocation.coordinates.lat, selectedLocation.coordinates.lon], 10);
                locationMarker.marker.bindPopup(selectedLocation.name).openPopup();
            }
        }
    }

    useEffect(()=>{
        var map = L.map('mapid', 
        {
            zoom:5,
            center: [51.505, -0.09]
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 19,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibWphbXJ5IiwiYSI6ImNqcmdtc3JnZjAyYTA0YXFxMDRkMG93MjYifQ.u8XNxfJHLLy3Vnbo3R40sA'
        }).addTo(map);
        
        setMapObject(map);
    }, [])

    useEffect(()=>{
        if(mapObject)
        {
            visibleMarkers.forEach(location => {
                location.marker.remove();
            })

            var markers = [];
            locations.forEach(location => {
                if(CoordinatesValidator().isValid(location.coordinates.lat) 
                && CoordinatesValidator().isValid(location.coordinates.lon))
                {
                    let coordinates = [location.coordinates.lat, location.coordinates.lon];
                    markers.push({
                        marker: setupMarker(location, coordinates),
                        id: location.id
                    });

                    mapObject.setView(coordinates)
                }
            })
            
            setVisibleMarkers(markers);

            if(options.canAddMarker){
                mapObject.on('click', (e)=>{
                    options.onCoordinatesUpdated(e.latlng);
                })
            }
        }
    }, [mapObject, locations])

    useEffect(()=>{
        showSelectedLocation(selectedLocation)
    }, [selectedLocation])

    return ( 
        <div id="mapid" className={options.style}></div> 
    );
}

export default MapView;