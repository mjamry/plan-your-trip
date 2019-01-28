import React, {Component} from 'react';
import L from 'leaflet'

class MapView extends Component {
    componentDidMount(){
        this.mymap = L.map('mapid').setView([51.505, -0.09], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1IjoibWphbXJ5IiwiYSI6ImNqcmdtc3JnZjAyYTA0YXFxMDRkMG93MjYifQ.u8XNxfJHLLy3Vnbo3R40sA'
      }).addTo(this.mymap);
      
      L.marker([51.5, -0.09]).addTo(this.mymap);
    }

    render(){
        return (
            <div>
                <div id="mapid"></div>
            </div>
        );
  }
}

export default MapView;