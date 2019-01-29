const xmlHeader = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>'
const Header = `<gpx 
xmlns="http://www.topografix.com/GPX/1/1" 
xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" 
xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" 
creator="Oregon 400t" 
version="1.1" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd">`;
const Footer = '</gpx>'

const Metadata = `<metadata>
                    <link href="http://www.garmin.com">
                        <text>Garmin International</text>
                    </link>
                    <time>${Date.now()}</time>
                </metadata>`

const FileContent = `<gpx 
version="1.1" 
creator="michal.jamry@gmail.com" 
xmlns="http://www.topografix.com/GPX/1/1" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">

<wpt lat="63.6156" lon="-19.98962">
<name>Wodospad Seljalandsfoss</name>
<desc></desc>
</wpt>
<wpt lat="63.5435" lon="-19.66587">
<name>Wulkan Eyafjallajökull</name>
<desc>Widac z trasy - nie trzeba podjezdzac</desc>
</wpt>
</gpx>`

export default class GpxFileGenerator{
    static Generate(items){
        return new Promise((resolve, reject)=>{
            var fileContent = xmlHeader + Header + Metadata;
            for(let index in items){
            let item = items[index];
            fileContent += `<wpt lat="${item.coordinates.lat}" lon="${item.coordinates.lon}">
                                <name>${item.name} [${item.attractivness}]</name>
                                <desc>${item.description}</desc>
                            </wpt>`
            }

            fileContent += Footer;
            resolve(fileContent);
        })
    }
}