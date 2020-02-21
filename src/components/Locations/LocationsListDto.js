export default class locationsList {
    constructor(id, name, description, isPrivate, created, updated){
        this.id = id;
        this.name = name;
        this.description = description;
        this.isPrivate = isPrivate;
        this.created = created;
        this.updated = updated;
    }
    id;
    name;
    description;
    isPrivate;
    created;
    updated;
    numberOfItems;
}