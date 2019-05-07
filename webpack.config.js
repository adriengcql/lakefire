const path = require('path');

module.exports = {
    mode: 'development',
    entry: './test/app/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.lkf$/i,
                use: 'raw-loader',
            },
            {
                test: /global\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /[^(global)]\.css$/,
                use: ['style-loader', { loader: 'css-loader', options: { modules: true, localIdentName: '[name]__[local]___[hash:base64:5]' } }],
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.json']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dev/public')
    }
};