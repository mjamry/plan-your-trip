import { CoordinateDto } from '../Common/Dto/CoordinateDto';

interface ILocationProvider {
  canGetLocation: boolean;
  getLocation: () => Promise<CoordinateDto>;
}

const useLocationProvider = (): ILocationProvider => {
  const getLocation = (): Promise<CoordinateDto> => new Promise<CoordinateDto>(
    (resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({ lat: position.coords.latitude, lon: position.coords.longitude });
        });
      } else {
        reject();
      }
    },
  );

  return {
    canGetLocation: !!navigator.geolocation,
    getLocation,
  };
};

export default useLocationProvider;
