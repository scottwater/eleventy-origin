module.exports = () => {
  const site = require("./site.json");
  return {
    site: process.env.URL || site.url
  };
};
