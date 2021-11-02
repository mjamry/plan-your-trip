const PATTERN = "^([-]?\\d*[.]?\\d+)$";

const isNumber = (value) => {
    var reg = new RegExp(PATTERN);
    return reg.test(value);
}

const CoordinatesValidator = () => {
    var isValid = (value) => {
        return isNumber(value);
    }

    return {isValid: isValid}
}

export default CoordinatesValidator;