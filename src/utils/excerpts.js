// Based code found here: https://github.com/11ty/eleventy/issues/179#issuecomment-413119342

module.exports = function(eleventyConfig, options = {}) {
  options.stripTags = options.stripTags || false;
  options.excerptMinimumLength = options.excerptMinimumLength || 140;
  options.excerptSeparator = options.excerptSeparator || "<!--more-->";
  options.frontMatterKey = options.frontMatterKey || "excerpt";
  eleventyConfig.addShortcode("excerpt", post => findAndCleanExcerpt(post));

  function findAndCleanExcerpt(post) {
    const rawExcerpt = extractExcerpt(post);
    if (options.stripTags) {
      return stripHTML(rawExcerpt);
    }
    return rawExcerpt;
  }

  /**
   * Extracts the excerpt from a document.
   *
   * @param {*} doc A real big object full of all sorts of information about a document.
   * @returns {String} the excerpt.
   */
  function extractExcerpt(doc) {
    if (doc.data[options.frontMatterKey]) {
      return doc.data[options.frontMatterKey];
    }
    if (!doc.hasOwnProperty("templateContent")) {
      console.warn(
        "Failed to extract excerpt: Document has no property `templateContent`."
      );
      return "";
    }

    const content = doc.templateContent.replace(/<p><img.+<\/p>/, "");
    const excerptIndex = content.indexOf(options.excerptSeparator);
    if (excerptIndex > -1) {
      return content.substring(0, excerptIndex).trim();
    } else if (content.length <= options.excerptMinimumLength) {
      return content.trim();
    }

    const excerptEnd = findExcerptEnd(content);
    return content.substring(0, excerptEnd).trim();
  }

  /**
   * Finds the end position of the excerpt of a given piece of content.
   * This should only be used when there is no excerpt marker in the content (e.g. no `<!--more-->`).
   *
   * @param {String} content The full text of a piece of content (e.g. a blog post)
   * @param {Number?} skipLength Amount of characters to skip before starting to look for a `</p>`
   * tag. This is used when calling this method recursively.
   * @returns {Number} the end position of the excerpt
   */
  function findExcerptEnd(content, skipLength = 0) {
    if (content === "") {
      return 0;
    }

    const paragraphEnd = content.indexOf("</p>", skipLength) + 4;

    if (paragraphEnd < options.excerptMinimumLength) {
      return (
        paragraphEnd +
        findExcerptEnd(content.substring(paragraphEnd), paragraphEnd)
      );
    }

    return paragraphEnd;
  }

  function stripHTML(content) {
    if (content === "") {
      return "";
    }

    return content.replace(
      /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi,
      ""
    );
  }
};
