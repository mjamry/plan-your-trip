export default class LanguageProvider {
    static _currentLanguage = "";
    
    static set(language){
        this._currentLanguage = language;
    } 

    static get(){
        if(this._currentLanguage === ""){
            this._currentLanguage = (navigator.language || navigator.userLanguage).substr(0, 2);
        }

        return this._currentLanguage;
    }
}