const PATTERN = '^([-]?\\d*[.]?\\d+)$';

const isNumber = (value: string) => {
  const reg = new RegExp(PATTERN);
  return reg.test(value);
};

const CoordinatesValidator = () => {
  const isValid = (value: string) => isNumber(value);

  return { isValid };
};

export default CoordinatesValidator;
