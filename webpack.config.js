const {join} = require("path");
const {ProgressPlugin} = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function () {
    const mode = process.env.NODE_ENV;
    const devMode = mode === "development";
    const appPath = __dirname;
    const srcPath = join(appPath, "./src");
    const distPath = join(appPath, "./dist");
    const assetsPath = join(appPath, "./assets");

    return {
        mode,
        devtool: devMode ? "source-map" : undefined,
        entry: join(srcPath, "./index.tsx"),
        output: {
            path: distPath,
            filename: "index.js",
            chunkFilename: "[chunkhash].chunk.js",
            assetModuleFilename: "[hash][ext][query]",
            publicPath: "/",
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.tsx?$/i,
                    loader: "ts-loader"
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                modules: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                sassOptions: {
                                    outputStyle: "compressed"
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.hbs$/,
                    loader: "handlebars-loader"
                }
            ]
        },
        plugins: [
            new ProgressPlugin(),
            new HtmlWebpackPlugin({
                favicon: join(assetsPath, "./favicon.ico"),
                template: join(srcPath, "./index.hbs")
            })
        ],
        resolve: {
            extensions: [".js", ".ts", ".tsx"]
        },
        devServer: {
            port: 80,
            static: {
                directory: distPath
            },
            hot: false,
            historyApiFallback: true,
            open: true
        }
    };
};
