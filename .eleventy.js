module.exports = function(eleventyConfig) {
  // Copy assets to the output directory
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("logo-afrique-decrypte.png");
  eleventyConfig.addPassthroughCopy("photos-blog"); // Updated this line

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
