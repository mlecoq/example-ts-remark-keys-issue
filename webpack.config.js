const path = require("path");
const nodeExternals = require("webpack-node-externals");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const keysTransformer = require("ts-transformer-keys/transformer").default;

module.exports = {
  mode:
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "preproduction" ||
    process.env.PLATFORM === "preproduction"
      ? "production"
      : "development",
  entry: { start: ["./start.ts"] },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader?configFile=tsconfig.webpack.json",
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
    modules: [path.resolve(__dirname, "node_modules")],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.webpack.json"
      })
    ]
  },
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js"
  }
};
