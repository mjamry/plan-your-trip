const PATTERN = '^([-]?\\d*[.]?\\d+)$';

/* eslint-disable @typescript-eslint/no-unused-vars */

const isNumber = (value: string) => {
  const reg = new RegExp(PATTERN);
  return reg.test(value);
};

const CoordinatesValidator = () => {
  const isValid = (value: number | string) => {
    if (typeof value !== 'string') return true;
    return typeof +value === 'number' && !Number.isNaN(+value);
  };

  return { isValid };
};

export default CoordinatesValidator;
