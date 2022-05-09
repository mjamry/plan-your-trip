import wiki from 'wikijs';
import LocationDto from './Dto/LocationDto';
import useLanguageProvider from './LanguageProvider';

const NumberOfResults = 5;
const NumberOfImages = 9;

type IWikiSearchService = {
  search: (input: string) => Promise<string[]>;
  getDetails: (input: string) => Promise<LocationDto>;
  getImages: (input: string) => Promise<string[]>;
}

const useWikiSearch = ():IWikiSearchService => {
  const languageProvider = useLanguageProvider();

  const getApiUrl = () => `https://${languageProvider.getUserLanguage()}.wikipedia.org/w/api.php`;

  const search = (input: string) => wiki({ apiUrl: getApiUrl() })
    .search(input, NumberOfResults)
    .then((data) => data.results);

  const getDetails = (input: string): Promise<LocationDto> => wiki({ apiUrl: getApiUrl() })
    .page(input)
    .then((page) => Promise.all([
      page.raw.title,
      page.summary(),
      page.coordinates(),
    ]))
    .then(([name, details, geo]) => {
      const data: LocationDto = {
        id: 0, name, description: details, coordinates: geo,
      };
      return data;
    });

  const getImages = (input: string): Promise<string[]> => wiki({ apiUrl: getApiUrl() })
    .page(input)
    .then((page) => page.images())
    .then((data) => data
      .filter((url) => !url.includes('.svg'))
      .splice(0, NumberOfImages));

  return {
    search,
    getDetails,
    getImages,
  };
};

export default useWikiSearch;
