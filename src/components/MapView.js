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

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
            maxZoom: 16,
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
        <div className="container">
            <div className="row">
                <div id="mapid"></div> 
            </div> 
        </div>
    );
}

export default MapView;