import React, {useState, useEffect} from 'react';
import {useLocationsState} from '../State/LocationsState'
import L from 'leaflet'

var MapView = () => {
    const [{locations, locationSelectedOnMap}] = useLocationsState();
    const [visibleMarkers, setVisibleMarkers] = useState([]);
    const [mapObject, setMapObject] = useState(null);
    
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
                if(location.coordinates.lat && location.coordinates.lon){
                    let coordinates = [location.coordinates.lat, location.coordinates.lon]
                    markers.push({
                        marker: L.marker(coordinates, {title: location.name})
                            .addTo(mapObject)
                            .bindPopup(location.name)
                            .openPopup(),
                        id: location.id
                    });

                    mapObject.setView(coordinates)
                }
            })
            
            setVisibleMarkers(markers);
        }
    }, [mapObject, locations])

    useEffect(()=>{
        if(locationSelectedOnMap && mapObject)
        {
            var selectedLocation = visibleMarkers.find(el => el.id === locationSelectedOnMap.id);
            if(selectedLocation){
                mapObject.setView([locationSelectedOnMap.coordinates.lat, locationSelectedOnMap.coordinates.lon]);
                selectedLocation.marker.bindPopup(locationSelectedOnMap.name).openPopup();
            }
        }
    }, [locationSelectedOnMap])

    return ( 
        <div className="map-container">
            <div className="row">
                <div id="mapid"></div> 
            </div> 
        </div>
    );
}

export default MapView;