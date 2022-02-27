module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: {
    autoprefixer: {},
    "css-declaration-sorter": { order: "smacss" },
    cssnano: ctx.env === "prod" ? {} : false,
  },
});
