import wiki from 'wikijs';
import ItemDetails from './ItemDetails';

export default class WikipediaAPIWrapper{
    static searchResult = {}

    static search(input, callback){
        wiki()
        .search(input)
        .then(data => callback(data.results))
    }

    static getDetails(input){
        return wiki()
        .page(input)
        .then(page => Promise.all([page.summary(), page.coordinates(), page.mainImage()])
            .then(details => new ItemDetails(details[0].name, details[0], 0, details[1], details[2], "")))
    }
}