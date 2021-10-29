const PATTERN = '^([-]?\\d*[.]?\\d+)$';

const isNumber = (value: string) => {
  const reg = new RegExp(PATTERN);
  return reg.test(value);
};

const CoordinatesValidator = () => {
  //TODO add some proper validation
  const isValid = (value: number) => true;

  return { isValid };
};

export default CoordinatesValidator;
