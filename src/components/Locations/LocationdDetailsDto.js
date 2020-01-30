export default class locationDetails {
  constructor(id, name, description, attractivness, coordinates, image, link, listId){
    this.name = name;
    this.description = description;
    this.attractivness = attractivness || 1;
    this.coordinates = coordinates;
    this.image = image;
    this.link = link;
    this.id = id;
    this.listId = listId;
  }
    id;
    name;
    description;
    attractivness;
    coordinates;
    image;
    link;
    listId;
  };