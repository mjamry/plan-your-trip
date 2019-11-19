import wiki from 'wikijs';
import ItemDetails from '../components/Items/LocationdDetailsDto';
import LanguageProvider from '../Common/LanguageProvider';

const NumberOfResults = 5;
const API_URL = `https://${LanguageProvider.get()}.wikipedia.org/w/api.php`

export default class WikipediaAPIWrapper{
    static searchResult = {}

    static search(input){
        return wiki({apiUrl: API_URL})
        .search(input)
        .then(data => data.results.splice(0, NumberOfResults))
    }

    static getDetails(input){
        return wiki({apiUrl: API_URL})
        .page(input)
        .then(page => {return Promise.all([page.info("name"), page.summary(), page.coordinates(), page.mainImage()])})
        .then(([name, details, geo, img] )=> new ItemDetails(name, details, 0, geo, img, ""))
    }
}