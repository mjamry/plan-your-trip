export default class LanguageProvider {
    static currentLanguage = '';

    static set(language: string) {
      this.currentLanguage = language;
    }

    static get() {
      if (this.currentLanguage === '') {
        this.currentLanguage = (navigator.language).substr(0, 2);
      }

      return this.currentLanguage;
    }
}
