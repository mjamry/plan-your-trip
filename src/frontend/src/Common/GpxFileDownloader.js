import GpxFileGenerator from './GpxFileGenerator';

export default class GpxFileDownloader {

  static download = (locations) => {
    GpxFileGenerator
    .generate(locations)
    .then(fileContent => this._showDownloadDialog(fileContent));
   }

  static _showDownloadDialog = (fileContent) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
    element.setAttribute('download', `PlanYourTrip_${new Date().toISOString()}.gpx`);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
}