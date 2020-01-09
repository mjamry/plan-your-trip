export default class locationDetails {
  constructor(id, name, description, attractivness, coordinates, image, link){
    this.name = name;
    this.description = description;
    this.attractivness = attractivness || 1;
    this.coordinates = coordinates;
    this.image = image;
    this.link = link;
    this.id = id;
  }
    id;
    name;
    description;
    attractivness;
    coordinates;
    image;
    link;
  };