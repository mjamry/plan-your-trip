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
        .then(page => {return Promise.all([page.info("name"), page.summary(), page.coordinates(), page.mainImage()])})
        .then(([name, details, geo, img] )=> new ItemDetails(name, details, 0, geo, img, ""))
    }
}