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
xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">`;

const GpxFooter = '</gpx>'

const Metadata = `
<metadata>
    <link href="${Creator}">
        <text>${Creator}</text>
    </link>
    <time>${Date.now()}</time>
</metadata>`

export default class GpxFileGenerator{
    static Generate(items){
        return new Promise((resolve, reject)=>{
            var fileContent = XmlSchema + GpxHeader + Metadata;
            for(let index in items){
                let item = items[index];
                if(item.coordinates){
                    fileContent += `
<wpt lat="${item.coordinates.lat}" lon="${item.coordinates.lon}">
    <name>${item.name} [${item.attractivness}]</name>
    <desc>${item.description}</desc>
</wpt>`
                }else{
                    reject(`The ${item.name} item has incorrect gps coordinates.`);
                }
            }

            fileContent += GpxFooter;
            resolve(fileContent);
        })
    }
}