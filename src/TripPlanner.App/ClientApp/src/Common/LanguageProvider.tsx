type ILanguageProvider = {
  getUserLanguage: () => string;
}

const LanguagePattern = '[a-z]{2}';
const DefaultLanguage = 'en';
/* eslint-disable no-console */
const useLanguageProvider = (): ILanguageProvider => {
  const getUserLanguage = (): string => {
    const userDefaultLanguage = navigator.language;
    if (userDefaultLanguage === null) {
      return DefaultLanguage;
    }

    const langSearch = new RegExp(LanguagePattern).exec(userDefaultLanguage);
    if (langSearch) {
      console.log(langSearch);
      return langSearch[0];
    }

    return DefaultLanguage;
  };

  return {
    getUserLanguage,
  };
};

export default useLanguageProvider;
