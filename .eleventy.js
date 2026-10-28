const fs = require("fs");
const path = require("path");

module.exports = function(eleventyConfig) {
  // Copy assets to the output directory
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("logo-afrique-decrypte.png");
  eleventyConfig.addPassthroughCopy("photos-blog"); // Updated this line
  eleventyConfig.addPassthroughCopy("podcasts");

  // Miniature d'un article pour la page d'accueil : champ `thumbnail` ou `image` du front matter,
  // sinon la première image locale (hors base64) trouvée dans le contenu
  eleventyConfig.addFilter("thumbnail", function(post) {
    const exists = (src) => {
      if (!src || src.startsWith("data:")) return false;
      if (/^https?:\/\//.test(src)) return true;
      return fs.existsSync(path.join(__dirname, decodeURI(src)));
    };
    for (const src of [post.data.thumbnail, post.data.image]) {
      if (exists(src)) return src;
    }
    const html = post.content || "";
    const re = /<img[^>]+src=["']([^"']+)["']/gi;
    let m;
    while ((m = re.exec(html))) {
      if (exists(m[1])) return m[1];
    }
    return null;
  });

  // Set up collections
  eleventyConfig.addCollection("post", function(collectionApi) {
    return collectionApi.getFilteredByTag("post").sort(function(a, b) {
      return a.date - b.date;
    });
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
