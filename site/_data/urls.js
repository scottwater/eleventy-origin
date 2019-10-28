module.exports = () => {
  const site = require("./site.json");
  return {
    site: process.env.DEPLOY_PRIME_URL || process.env.URL || site.url
  };
};
