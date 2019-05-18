const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './test/app/index.ts',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'test/server/public'),
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.lkf$/i,
                use: path.resolve('./lib/loader'),
            },
            {
                test: /global\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /[^(global)]\.css$/,
                use: ['style-loader', { loader: 'css-loader', options: { modules: true, localIdentName: '[name]__[local]___[hash:base64:5]' } }],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.json']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'test/server/public')
    }
};