import wiki from 'wikijs';
import LocationDto from './Dto/LocationDto';
import LanguageProvider from './LanguageProvider';

const NumberOfResults = 5;
const API_URL = `https://${LanguageProvider.get()}.wikipedia.org/w/api.php`;

export default class WikipediaAPIWrapper {
    static searchResult = {};

    static search(input: string) {
      return wiki({ apiUrl: API_URL })
        .search(input)
        .then((data) => data.results.splice(0, NumberOfResults));
    }

    static getDetails(input: string): Promise<LocationDto> {
      return wiki({ apiUrl: API_URL })
        .page(input)
        .then((page) => Promise.all([
          page.raw.title,
          page.summary(),
          page.coordinates(),
          page.mainImage(),
        ]))
        .then(([name, details, geo, img]) => {
          const data: LocationDto = {
            id: 0, name, description: details, coordinates: geo, image: img,
          };
          return data;
        });
    }
}
