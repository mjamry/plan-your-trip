const PATTERN = '^([-]?\\d*[.]?\\d+)$';

/* eslint-disable @typescript-eslint/no-unused-vars */

const isNumber = (value: string) => {
  const reg = new RegExp(PATTERN);
  return reg.test(value);
};

const CoordinatesValidator = () => {
  // TODO add some proper validation
  const isValid = (value: number) => true;

  return { isValid };
};

export default CoordinatesValidator;
