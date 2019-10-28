module.exports = () => {
  const date = new Date();
  year = date.getFullYear();
  return {
    copyright: (startYear = year) => {
      if (startYear === year) {
        return `&copy; ${year}`;
      }
      return `&copy; ${startYear}-${year}`;
    },
    date,
    year
  };
};
