export default class locationsList {
    constructor(id, name, description, private, created, updated){
        this.id = id;
        this.name = name;
        this.description = description;
        this.private = private;
        this.created = created;
        this.updated = updated;
    }
    id;
    name;
    description;
    private;
    created;
    updated;
    numberOfItems;
}