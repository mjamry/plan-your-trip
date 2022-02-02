import { CoordinateDto, CoordinateEmpty } from './CoordinateDto';

type LocationDto = {
  id: number;
  name: string;
  description: string;
  rating?: number;
  coordinates: CoordinateDto;
  image?: string;
  link?: string;
  planId?: number;
};

export const LocationEmpty: LocationDto = {
  id: 0,
  name: '',
  description: '',
  coordinates: CoordinateEmpty,
};

export default LocationDto;
