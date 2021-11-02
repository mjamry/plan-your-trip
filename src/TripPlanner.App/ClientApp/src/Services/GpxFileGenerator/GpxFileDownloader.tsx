import LocationDto from '../../Common/Dto/LocationDto';
import useGpxFileGeneratorService from './GpxFileGenerator';

type IGpxFileDownloader = {
  download: (locations: LocationDto[]) => void;
}

const useGpxFileDownloader = (): IGpxFileDownloader => {
  const gpxFileGenerator = useGpxFileGeneratorService();

  const showDownloadDialog = (fileContent: string) => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(fileContent)}`);
    element.setAttribute('download', `PlanYourTrip_${new Date().toISOString()}.gpx`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const download = (locations: LocationDto[]) => {
    gpxFileGenerator
      .generate(locations)
      .then((fileContent: string) => showDownloadDialog(fileContent));
  };

  return {
    download,
  };
};

export default useGpxFileDownloader;
