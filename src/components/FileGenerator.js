import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GpxFileGenerator from '../Common/GpxFileGenerator';

var FileGenerator = (props) => {

  var download = () => {
    GpxFileGenerator
    .generate(props.waypoints)
    .then(fileContent => showDownloadDialog(fileContent));
   }

  var showDownloadDialog = (fileContent) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
    element.setAttribute('download', `PlanYourTrip_${new Date().toISOString()}.gpx`);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  return (
    <div className="FileGenerator">
      <FontAwesomeIcon icon="file-download" title="generate gpx file" className="item-delete fa-2x" onClick={download}/>
    </div>
  )
}

export default FileGenerator;