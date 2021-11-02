import LocationDto from '../../Common/Dto/LocationDto';
import useLoggerService from '../Diagnostics/LoggerService';
import {
  Creator, GpxFooter, GpxHeader, XmlSchema,
} from './GpxFileConsts';

const useGpxHelper = () => {
  const getMetadata = () => `
<metadata>
    <link href="http://${Creator}">
        <text>${Creator}</text>
    </link>
    <time>${new Date().toISOString()}</time>
</metadata>`;

  const getWaypoint = (location: LocationDto) => `
<wpt lat="${location.coordinates.lat}" lon="${location.coordinates.lon}">
    <name>${location.name} [${location.rating}]</name>
    <desc>${location.description}</desc>
</wpt>`;

  return {
    getMetadata,
    getWaypoint,
  };
};

type IGpxFileGenerator = {
  generate: (locations: LocationDto[]) => Promise<string>;
}

const useGpxFileGeneratorService = (): IGpxFileGenerator => {
  const helper = useGpxHelper();
  const logger = useLoggerService('GpxFileGeneratorService');

  const generate = (locations: LocationDto[]): Promise<string> => new Promise((resolve, reject) => {
    // File headers
    let fileContent = XmlSchema + GpxHeader;
    // File metadata
    fileContent += helper.getMetadata();
    // Waypoints
    locations.forEach((item) => {
      if (item.coordinates) {
        fileContent += helper.getWaypoint(item);
      } else {
        logger.error(`The ${item.name} location has incorrect gps coordinates.`);
        reject();
      }
    });

    // File closure
    fileContent += GpxFooter;
    resolve(fileContent);
  });

  return {
    generate,
  };
};

export default useGpxFileGeneratorService;
