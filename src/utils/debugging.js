module.exports = eleventyConfig => {
  eleventyConfig.addLiquidTag("pageData", function() {
    return {
      parse: function() {},
      render: function(scope) {
        const { collections, pkg, scripts, ...pageData } = scope["contexts"][0];
        let ret = `<pre>${JSON.stringify(pageData, null, 2)}</pre>`;
        return Promise.resolve(ret);
      }
    };
  });

  eleventyConfig.addNunjucksTag("pageData", function(nunjucksEngine) {
    return new (function() {
      this.tags = ["pageData"];

      this.parse = function(parser, nodes, _) {
        var tok = parser.nextToken();
        var args = parser.parseSignature(null, true);

        // fake it until you make it!
        // https://github.com/mozilla/nunjucks/issues/158#issuecomment-34919343
        if (args.children.length === 0) {
          args.addChild(new nodes.Literal(0, 0, ""));
        }

        parser.advanceAfterBlockEnd(tok.value);
        return new nodes.CallExtensionAsync(this, "run", args);
      };

      this.run = function(context, _, callback) {
        // exclude the things we do not want
        // and cause circular references (collections) :(
        const { collections, pkg, scripts, ...pageData } = context["ctx"];
        let ret = new nunjucksEngine.runtime.SafeString(
          `<pre>${JSON.stringify(pageData, null, 2)}</pre>`
        );
        callback(null, ret);
      };
    })();
  });

  //Nunjucks has a dump filter, but it is not available in Liquid
  eleventyConfig.addFilter("dump", function(value, spaces = 2) {
    return `<pre>${JSON.stringify(value || "NOTHING", null, spaces)}</pre>`;
  });
};
