const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './app/index.ts',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'server/public'),
        hot: true,
        historyApiFallback: true
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
                use: path.resolve('node_modules/lakefire/lib/loader'),
            },
            {
                test: /global\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /[^(global)]\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { modules: true, localIdentName: '[name]__[local]___[hash:base64:5]' } }
                ]
            },
            {
                test: /global\.(scss|sass)$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /[^(global)]\.(scss|sass)$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { modules: true, localIdentName: '[name]__[local]___[hash:base64:5]' } },
                    'sass-loader'
                ]
            },
            {
                test: /global\.less$/,
                loader: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /[^(global)]\.less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { modules: true, localIdentName: '[name]__[local]___[hash:base64:5]' } },
                    'less-loader'
                ]
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
        path: path.resolve(__dirname, 'server/public')
    }
};