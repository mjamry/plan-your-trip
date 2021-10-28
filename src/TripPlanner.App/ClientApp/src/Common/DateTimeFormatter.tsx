const DateTimeFormatter = () => {
  const format = (dt: string) => {
    const dateTime = new Date(dt);
    return dateTime.toLocaleDateString() || '';
  };

  return {
    format,
  };
};

export default DateTimeFormatter;
