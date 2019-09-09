const path = require('path');
const webpack = require('webpack');
const sw = require('stylesheet-writer')
const sockjs = require('sockjs')
const find = require('find')

module.exports = {
    mode: 'development',
    entry: {
        app: './test/app/index.ts',
        devtools: './src/devtools.ts'
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'test/server/public'),
        hot: true,
        historyApiFallback: {
            index: 'index.dev.html',
        },
        after: async function (app, server) {
            while (typeof server.listeningApp === 'undefined') {
                await new Promise((res) => setTimeout(res, 500))
            }
            const socket = sockjs.createServer({
                sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.3.0/sockjs.min.js',
                log: (severity, line) => {
                    if (severity === 'error') {
                        console.error(line);
                    }
                }
            });
            socket.on('connection', (connection) => {
                console.log('Devtools connected');
                const styles = {}
                connection.on('data', async (msg) => {
                    const { source, selector, property, value } = JSON.parse(msg)
                    if (!styles[source]) {
                        find.file(source, path.resolve(__dirname, 'test/app'), (files) => {
                            if (files.length) {
                                styles[source] = sw.open(files[0], { autosave: true })
                                styles[source].writeProperty(selector, property, value)

                            }
                        })
                    }
                    styles[source].writeProperty(selector, property, value)
                })
            })
            socket.installHandlers(server.listeningApp, { prefix: '/devtools' })
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader', path.resolve('./lib/componentLoader')],
                exclude: /node_modules/
            },
            {
                test: /\.lkf$/i,
                use: path.resolve('./lib/templateLoader'),
            },
            {
                test: /global\.css$/,
                loader: ['style-loader', { loader: 'css-loader', options: { sourceMap: true } }]
            },
            {
                test: /[^(global)]\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { sourceMap: true, modules: true, localIdentName: '[name]__[local]' } },
                ]
            },
            {
                test: /global\.(scss|sass)$/,
                loader: ['style-loader', { loader: 'css-loader', options: { sourceMap: true } }, 'sass-loader?sourceMap']
            },
            {
                test: /[^(global)]\.(scss|sass)$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { sourceMap: true, modules: true, localIdentName: '[name]__[local]' } },
                    'sass-loader?sourceMap'
                ]
            },
            {
                test: /global\.less$/,
                loader: ['style-loader', { loader: 'css-loader', options: { sourceMap: true } }, 'less-loader?sourceMap']
            },
            {
                test: /[^(global)]\.less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { sourceMap: true, modules: true, localIdentName: '[name]__[local]' } },
                    'less-loader?sourceMap'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
    ],
    resolve: {
        extensions: ['.ts', '.js', '.lkf', '.css', '.json']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'test/server/public')
    },
    node: {
        fs: 'empty',
        __dirname: true
    }
};