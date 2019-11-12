const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const debugging = require("./src/utils/debugging");
const seo = require("./src/utils/seo");
const excerpts = require("./src/utils/excerpts");
const markdown = require("./src/utils/markdown");
const { loadFilters } = require("./src/utils/filters");

module.exports = function(eleventyConfig) {
  // we need site/includes/packs.njk to be ignored in git
  // however, we still need it to watched for changes.
  // the .eleventyignore is used to tell Eleventy what to ignore
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setDataDeepMerge(true);

  const markdownIt = require("markdown-it");
  const markdownItEmoji = require("markdown-it-emoji");
  const markdownItFootnotes = require("markdown-it-footnote");
  const options = {
    html: true,
    breaks: true,
    linkify: true
  };

  const md = markdownIt(options)
    .use(markdownItEmoji)
    .use(markdownItFootnotes);

  debugging(eleventyConfig);
  seo(eleventyConfig);
  excerpts(eleventyConfig);
  markdown(eleventyConfig, md);
  loadFilters(eleventyConfig);
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPairedShortcode("markdown", function(content) {
    return md.render(content);
  });
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("default", "layouts/default.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");

  eleventyConfig.addCollection("feed", collection => {
    return collection
      .getFilteredByTag("blog")
      .reverse()
      .slice(0, 20);
  });

  // move to head so that it does not interfere
  // with turbolinks in development
  eleventyConfig.setBrowserSyncConfig({
    // show 404s in dev. Borrowed from eleventy blog starter
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync("dist/404.html");

        browserSync.addMiddleware("*", (_, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    },
    // scripts in body conflict with Turbolinks
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function(snippet, match) {
          return snippet + match;
        }
      }
    }
  });

  return {
    dir: { input: "site", output: "dist", data: "_data", includes: "includes" },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md", "css", "html", "yml"],
    htmlTemplateEngine: "njk"
  };
};
