import { CoordinateDto } from './CoordinateDto';

type LocationDto = {
    id: number;
    name: string;
    description: string;
    rating?: number;
    coordinates: CoordinateDto;
    image?: string;
    link?: string;
    listId?: number;
};

export default LocationDto;
