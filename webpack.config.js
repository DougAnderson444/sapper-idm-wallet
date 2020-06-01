const webpack = require("webpack");
const path = require("path");
const config = require("sapper/config/webpack.js");
const pkg = require("./package.json");
const mode = process.env.NODE_ENV || "development";
const dev = mode === "development";
const getPreprocessor = require("svelte-preprocess");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPlugins = require("./postcss.config.js");

const alias = { svelte: path.resolve("node_modules", "svelte") };
const extensions = [".mjs", ".js", ".json", ".svelte", ".html"];
const mainFields = ["svelte", "module", "browser", "main"];

console.log("mode", mode);

const cssConfig = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: { extract: true, plugins: postcssPlugins(!dev) },
    },
  ],
};

const preprocess = getPreprocessor({
  transformers: {
    postcss: {
      plugins: postcssPlugins(),
    },
  },
});

module.exports = {
  client: {
    entry: config.client.entry(),
    resolve: {
      alias: {
        svelte: path.resolve("node_modules", "svelte"),
        fs: "graceful-fs",
        net: "empty",
      },
      extensions: [".mjs", ".js", ".svelte"],
      mainFields: ["svelte", "browser", "module", "main"],
    },
    output: config.client.output(),
    module: {
      rules: [
        cssConfig,
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: "svelte-loader",
            options: {
              dev,
              preprocess,
              hydratable: true,
              hotReload: false, // pending https://github.com/sveltejs/svelte/issues/2377
            }
          }
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: "file-loader",
          options: { name: "[name].[ext]?[hash]" },
        }
      ]
    },
    mode,
    plugins: [
      // pending https://github.com/sveltejs/svelte/issues/2377
      // dev && new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin("main.css"),
      new webpack.DefinePlugin({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
    ].filter(Boolean),
    devtool: dev && "inline-source-map",
  },

  server: {
    entry: config.server.entry(),
    output: config.server.output(),
    target: "node",
    resolve: { alias, extensions, mainFields },
    externals: Object.keys(pkg.dependencies).concat("encoding"),
    module: {
      rules: [
		cssConfig,
		{
          test: /\.(svelte|html)$/,
          use: {
            loader: "svelte-loader",
            options: {
              preprocess,
              css: false,
              generate: "ssr",
              dev,
            },
          },
          exclude: ["/node_modules/"],
        },
      ],
    },
	mode: process.env.NODE_ENV,
	plugins: [
		new MiniCssExtractPlugin("main.css")
	  ].filter(Boolean),
    performance: {
      hints: false, // it doesn't matter if server.js is large
    },
  },

  serviceworker: {
    entry: config.serviceworker.entry(),
    output: config.serviceworker.output(),
    mode: process.env.NODE_ENV,
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  },
};
