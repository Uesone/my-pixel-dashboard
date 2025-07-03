// postcss.config.cjs
module.exports = {
  plugins: [
    require("postcss-import"),
    require("@fullhuman/postcss-purgecss").default({
      content: ["./index.html", "./src/**/*.jsx", "./src/**/*.js"],
      // Tieni solo le classi effettivamente usate in questi file!
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
    require("autoprefixer"),
  ],
};
