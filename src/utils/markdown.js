module.exports = (eleventyConfig, md) => {
  if (!md) {
    throw "Please pass an instance of MarkdownIt to the markdown filters";
  }

  eleventyConfig.addPairedShortcode("markdown", function(content) {
    return md.render(content.toString());
  });

  eleventyConfig.addFilter("md", function(content) {
    return md.render(content.toString());
  });
};
