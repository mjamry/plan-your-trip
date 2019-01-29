import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GpxFileGenerator from '../../GpxFileGenerator';

class FileGenerator extends Component {

  download = () => {
    GpxFileGenerator
    .generate(this.props.waypoints)
    .then(fileContent => this.showDownloadDialog(fileContent));
   }

  showDownloadDialog(fileContent){
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
    element.setAttribute('download', `PlanYourTrip_${new Date().toISOString()}.gpx`);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  render(){
    return (
      <div className="FileGenerator">
        <FontAwesomeIcon icon="file-download" title="generate gpx file" className="item-delete fa-2x" onClick={this.download}/>
      </div>
    )
  }
}

export default FileGenerator;