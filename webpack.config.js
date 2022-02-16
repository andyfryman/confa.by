const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

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
                { from: "src/assets/photos/*", to: "assets/photos/[name][ext]" },
                { from: "src/*.html", to: "[name][ext]" },
            ],
        }),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin({
                minify: CssMinimizerPlugin.cleanCssMinify,
            }),
            new TerserPlugin(),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["mozjpeg", { quality: 70 }],
                            ["pngquant", {}],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            [
                                "svgo",
                                {
                                    plugins: extendDefaultPlugins([
                                        {
                                            name: "removeViewBox",
                                            active: false,
                                        },
                                        {
                                            name: "addAttributesToSVGElement",
                                            params: {
                                                attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                                            },
                                        },
                                    ]),
                                },
                            ],
                        ],
                    },
                },
            }),
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