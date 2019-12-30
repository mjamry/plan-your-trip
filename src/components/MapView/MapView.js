import React, {useState, useEffect} from 'react';
import L from 'leaflet'

const defaultOptions = {
    draggable: false,
    style: "locations-map-view"
}

var MapView = ({locations, selLoc, options = defaultOptions}) => {
    const [visibleMarkers, setVisibleMarkers] = useState([]);
    const [mapObject, setMapObject] = useState(null);
    
    var setupMarker = (location, coordinates) => {

        var marker = L.marker(coordinates, {...options, title: location.name})
                            .addTo(mapObject)
                            .bindPopup(location.name)
                            .openPopup()

        if(options.draggable){
            marker.on('dragend', (e) => {
                options.onCoordinatesUpdated(marker.getLatLng())
            })
        }
        return marker;
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
                if(location.coordinates.lat && location.coordinates.lon){
                    let coordinates = [location.coordinates.lat, location.coordinates.lon];
                    markers.push({
                        marker: setupMarker(location, coordinates),
                        id: location.id
                    });

                    mapObject.setView(coordinates)
                }
            })
            
            setVisibleMarkers(markers);
        }
    }, [mapObject, locations])

    useEffect(()=>{
        if(selLoc && mapObject)
        {
            var selectedLocation = visibleMarkers.find(el => el.id === selectedLocation.id);
            if(selectedLocation){
                mapObject.setView([selectedLocation.coordinates.lat, selectedLocation.coordinates.lon]);
                selectedLocation.marker.bindPopup(selectedLocation.name).openPopup();
            }
        }
    }, [selLoc])

    return ( 
        <div className="map-container">
            <div className="row">
                <div id="mapid" className={options.style}></div> 
            </div> 
        </div>
    );
}

export default MapView;