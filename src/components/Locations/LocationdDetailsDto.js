export default class locationDetails {
  constructor(name, description, attractivness, coordinates, image, link){
    this.name = name;
    this.description = description;
    this.attractivness = attractivness || 1;
    this.coordinates = coordinates;
    this.image = image;
    this.link = link;
    this.id = (+new Date()).toString(32);
  }
    id;
    name;
    description;
    attractivness;
    coordinates;
    image;
    link;
  };