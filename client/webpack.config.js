const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack")
module.exports = {
    entry: {
        app: './index.js'
    },
    output: {
        filename: 'build.js'
    },
    devServer: {
        proxy: {
            '/api': 'http://localhost:8081'
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            bootstrap: 'bootstrap',
            'window.jQuery': 'jquery',
            tether: 'tether',
            Tether: 'tether',
            'window.Tether': 'tether',
            Popper: ['popper.js', 'default'],
            Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
            Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
            Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.(ogg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(jpg|png|PNG|svg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 500000,
                    },
                },
            },
        ],

    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'spaceout',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    }
}
