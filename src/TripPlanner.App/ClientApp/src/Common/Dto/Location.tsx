import { Coordinate } from './Coordinate';

export type Location = {
    id: number;
    name: string;
    description: string;
    rating: number;
    coordinates: Coordinate;
    image: string;
}
