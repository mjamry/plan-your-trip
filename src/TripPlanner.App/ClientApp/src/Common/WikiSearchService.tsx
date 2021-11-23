import wiki from 'wikijs';
import LocationDto from './Dto/LocationDto';
import useLanguageProvider from './LanguageProvider';

const NumberOfResults = 5;

type IWikiSearchService = {
  search: (input: string) => Promise<string[]>;
  getDetails: (input: string) => Promise<LocationDto>;
}

const useWikiSearch = ():IWikiSearchService => {
  const languageProvider = useLanguageProvider();

  const getApiUrl = () => `https://${languageProvider.getUserLanguage()}.wikipedia.org/w/api.php`;

  const search = (input: string) => wiki({ apiUrl: getApiUrl() })
    .search(input)
    .then((data) => data.results.splice(0, NumberOfResults));

  const getDetails = (input: string): Promise<LocationDto> => wiki({ apiUrl: getApiUrl() })
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

  return {
    search,
    getDetails,
  };
};

export default useWikiSearch;
