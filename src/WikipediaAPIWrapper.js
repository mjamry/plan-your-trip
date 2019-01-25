import wiki from 'wikijs';
import ItemDetails from './ItemDetails';

const NumberOfResults = 5;

export default class WikipediaAPIWrapper{
    static searchResult = {}

    static search(input){
        return wiki()
        .search(input)
        .then(data => data.results.splice(0, NumberOfResults))
    }

    static getDetails(input){
        return wiki()
        .page(input)
        .then(page => {return Promise.all([page.info("name"), page.summary(), page.coordinates(), page.mainImage()])})
        .then(([name, details, geo, img] )=> new ItemDetails(name, details, 0, geo, img, ""))
    }
}