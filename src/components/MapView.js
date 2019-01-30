import React, {
    Component
} from 'react';
import L from 'leaflet'

class MapView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visibleMarkers: []
        }
    }
    componentDidMount() {
        this.mymap = L.map('mapid', 
        {
            zoom:5,
            center: [51.505, -0.09]
        });

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
            maxZoom: 16,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibWphbXJ5IiwiYSI6ImNqcmdtc3JnZjAyYTA0YXFxMDRkMG93MjYifQ.u8XNxfJHLLy3Vnbo3R40sA'
        }).addTo(this.mymap);
    }

    removeMarkers = () => {
        for (var marker in this.state.visibleMarkers) {
            this.state.visibleMarkers[marker].remove();
        }
    }

    canUpdate = (prevProps) => {
        return JSON.stringify(prevProps) !== JSON.stringify(this.props);
    }

    componentDidUpdate(prevProps) {
        if (this.canUpdate(prevProps)) {
            this.removeMarkers();

            var markers = [];
            for (var p in this.props.points) {
                let marker = this.props.points[p];
                if(marker.coordinates.lat && marker.coordinates.lon){
                    let coordinates = [marker.coordinates.lat, marker.coordinates.lon]
                    markers.push(
                        L.marker(coordinates, {title: marker.name})
                        .addTo(this.mymap)
                        .bindPopup(marker.name)
                        .openPopup()
                        );

                    this.mymap.setView(coordinates)
                }
            }

            this.setState({
                visibleMarkers: markers
            });

            if(this.props.selected){
                this.mymap.setView([this.props.selected.coordinates.lat, this.props.selected.coordinates.lon])
            }
        }
    }

    render() {
        return ( 
            <div className="container">
                <div className="row">
                    <div id="mapid"></div> 
                </div> 
            </div>
        );
    }
}

export default MapView;