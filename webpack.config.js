const path = require("path");
const nodeExternals = require("webpack-node-externals");
const keysTransformer = require("ts-transformer-keys/transformer").default;

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: { start: ["./start.ts"] },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: [/node_modules/],
        options: {
          getCustomTransformers: program => ({
            before: [keysTransformer(program)]
          })
        }
      },
      {
        test: /\.js?$/,
        loader: "source-map-loader",
        exclude: [/node_modules/]
      }
    ]
  },
  node: { __dirname: false },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: [path.resolve(__dirname, "node_modules")]
  },
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js"
  }
};
