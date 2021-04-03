const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: ''
    },
    devtool: 'eval-cheap-module-source-map',
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { 
                test: /\.css$/, 
                exclude: /node_modules/, 
                use: [
                    { loader: 'style-loader' }, 
                    { loader: 'css-loader', 
                        options: {
                            importLoaders: 1, 
                            modules: {localIdentName: '[name]__[local]__[hash:base64:5]'}
                        } 
                    },
                    { 
                        loader: 'postcss-loader', 
                        options: {
                            postcssOptions: {
                                ident: 'postcss',
                                plugins: () => [autoprefixer()]
                            }
                        } 
                    }
                ]
            }
        ]   
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ],
    devServer: {
        host: '0.0.0.0',//your ip address
        port: 8080,
        disableHostCheck: true,
        
    }
};
