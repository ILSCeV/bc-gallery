const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    galleryjs: "./assets/js/gallery.js",
    gallerystyle:"./assets/css/gallery.css"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "static/gen"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: {
      querystring: require.resolve("querystring-es3"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      //bootstrap and bootbox need jQuery to be available, so make it available with the imports loader
      {
        test: /bootstrap.+\.(jsx|js)$/,
        use: [
          {
            loader: "imports-loader",
            options: {
              imports: ["default jquery $"],
            },
          },
        ],
      },
      {
        test: /\.(png|bmp|jpg|jpeg)$/,
        include: /(images)/,
        use: {
          loader: "file-loader",
        },
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg|bmp)$/,
        exclude: /(images)/,
        use: [
          {
            loader: "url-loader?limit=1024",
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: function () {
                  // post css plugins, can be exported to postcss.config.js
                  return [
                    //    require('precss'),
                    require("autoprefixer"),
                  ];
                },
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
