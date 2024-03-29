const Creator = 'PlanYourTrip.com';

const XmlSchema = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>';
const GpxHeader = `
<gpx 
xmlns="http://www.topografix.com/GPX/1/1" 
xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" 
xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" 
creator="${Creator}" 
version="1.1" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">`;

const GpxFooter = `
</gpx>`;

export {
  Creator, XmlSchema, GpxHeader, GpxFooter,
};
