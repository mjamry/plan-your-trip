import React, {useState, useEffect} from 'react';
import L from 'leaflet'

var MapView = (props) => {
    const [visibleMarkers, setVisibleMarkers] = useState([]);
    const [myMap, setMyMap] = useState(null);

    useEffect(()=>{
        if(myMap === null){
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
            
            setMyMap(map);
        }
    })

    useEffect(()=>{
        visibleMarkers.forEach(marker => {
            marker.remove();
        })

        var markers = [];
        for (var p in props.points) {
            let marker = props.points[p];
            if(marker.coordinates.lat && marker.coordinates.lon){
                let coordinates = [marker.coordinates.lat, marker.coordinates.lon]
                markers.push(
                    L.marker(coordinates, {title: marker.name})
                    .addTo(myMap)
                    .bindPopup(marker.name)
                    .openPopup()
                    );

                    myMap.setView(coordinates)
            }
        }
        
        setVisibleMarkers(markers);
    }, [props.points])

    useEffect(()=>{
        if(props.selected){
            myMap.setView([props.selected.coordinates.lat, props.selected.coordinates.lon])
        }
    }, [props.selected])

    return ( 
        <div className="container">
            <div className="row">
                <div id="mapid"></div> 
            </div> 
        </div>
    );
}

export default MapView;