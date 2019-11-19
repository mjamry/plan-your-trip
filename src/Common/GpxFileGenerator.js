const Creator = 'PlanYourTrip.com'

const XmlSchema = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>'
const GpxHeader = `
<gpx 
xmlns="http://www.topografix.com/GPX/1/1" 
xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" 
xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" 
creator="${Creator}" 
version="1.1" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">`

const GpxFooter = `
</gpx>`

class GpxHelper {
    static getMetadata(){
        return `
<metadata>
    <link href="http://${Creator}">
        <text>${Creator}</text>
    </link>
    <time>${new Date().toISOString()}</time>
</metadata>`
    }

    static getWaypoint(item){
        return `
<wpt lat="${item.coordinates.lat}" lon="${item.coordinates.lon}">
    <name>${item.name} [${item.attractivness}]</name>
    <desc>${item.description}</desc>
</wpt>`
    }
}

export default class GpxFileGenerator{
    static generate(items){
        return new Promise((resolve, reject)=>{
            //File headers
            var fileContent = XmlSchema + GpxHeader;
            //File metadata
            fileContent += GpxHelper.getMetadata();
            //Waypoints
            for(let index in items){
                let item = items[index];
                if(item.coordinates){
                    fileContent += GpxHelper.getWaypoint(item);
                }else{
                    reject(`The ${item.name} item has incorrect gps coordinates.`);
                }
            }
            //File closure
            fileContent += GpxFooter;
            resolve(fileContent);
        })
    }
}