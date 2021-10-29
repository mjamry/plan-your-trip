const useDateTimeFormatter = () => {
  const format = (dt: Date) => {
    const dateTime = new Date(dt);
    return dateTime.toLocaleDateString() || '';
  };

  return {
    format,
  };
};

export default useDateTimeFormatter;
