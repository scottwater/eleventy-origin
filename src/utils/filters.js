function removeTrailingSlash(url) {
  if (url && url.endsWith("/")) {
    return url.slice(0, url.length - 1);
  }
  return url;
}

function loadFilters(eleventyConfig) {
  eleventyConfig.addFilter("ts", removeTrailingSlash);
}

module.exports = { removeTrailingSlash, loadFilters };
