const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

module.exports = {
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'docs'),
    },
    entry: {
        "bundle.js": [path.resolve(__dirname, "src", "js", "main.js")],
        "bundle.css": [path.resolve(__dirname, "src", "css", "style.css")]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.min.css"
        }),
        new CopyPlugin({
            patterns: [
              { from: "src/assets/*", to: "assets/[name][ext]" },
              { from: "src/*.html", to: "[name][ext]" },
            ],
        }),
    ],
    optimization: {
        minimizer: [
          new CssMinimizerPlugin({
            minify: CssMinimizerPlugin.cleanCssMinify,
          }),
          new TerserPlugin()
        ],
        minimize: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
};