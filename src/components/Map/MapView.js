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

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
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
        let prevStateJson = JSON.stringify(prevProps.points)
        let currentStateJson = JSON.stringify(this.props.points)

        return prevStateJson !== currentStateJson;
    }

    componentDidUpdate(prevProps) {
        if (this.canUpdate(prevProps)) {
            this.removeMarkers();

            var markers = [];
            for (var p in this.props.points) {
                let marker = this.props.points[p];
                if(marker.coordinates.lat && marker.coordinates.lon){
                    markers.push(
                        L.marker([marker.coordinates.lat, marker.coordinates.lon], {title: marker.name})
                        .addTo(this.mymap)
                        .bindPopup(marker.name)
                        .openPopup()
                        );
                }
            }

            this.setState({
                visibleMarkers: markers
            });
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