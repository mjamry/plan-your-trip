import { Coordinate } from '../Common/Dto/Coordinate';

type LocationDto = {
    id: number;
    name: string;
    description: string;
    rating: number;
    coordinates: Coordinate;
    image: string;
    link: string;
    listId: number;
};

export default LocationDto;
