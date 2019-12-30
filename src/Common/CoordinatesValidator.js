const PATTERN = "^([-]?\\d*[.]?\\d+)$";

const isNumber = (value) => {
    var reg = new RegExp(PATTERN);
    return reg.test(value);
}

export default class CoordinatesValidator{
    static isLatitudeValid = (lat) => {
        
        if(isNumber(lat)){
            return true;
        }

        return false;
    }

    static isLongitudeValid = (lon) => {
        if(isNumber(lon)){
            return true;
        }

        return false;
    }
}