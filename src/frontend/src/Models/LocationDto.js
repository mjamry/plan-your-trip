export default class locationDto {
  constructor(id, name, description, rating, coordinates, image, link, listId){
    this.name = name;
    this.description = description;
    this.rating = rating || 1;
    this.coordinates = coordinates;
    this.image = image;
    this.link = link;
    this.id = id;
    this.listId = listId;
  }
    id;
    name;
    description;
    rating;
    coordinates;
    image;
    link;
    listId;
  };