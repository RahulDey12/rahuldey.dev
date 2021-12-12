const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (_env, options) => {
    const isProduction = options.mode !== 'development';

    let config = {
        entry: ['./src/js/app.js', './src/scss/app.scss'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/app.js',
            pathinfo: isProduction,
            clean: true,
        },
    
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, 'src'),
                    use: {
                        loader: 'swc-loader',
                    }
                },
    
                {
                    test: /\.(sa|sc|c)ss$/,
                    include: path.resolve(__dirname, 'src'),
                    use: [
                        isProduction ? 
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../',
                            }
                        } : 
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                },

                {
                    test: /\.(jpe?g|png|webp|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'public/[name]-[hash][ext]'
                    }
                },

                {
                    test: /\.(html)$/,
                    use: ['html-loader']
                }
            ]
        },

        plugins: [
            new WebpackBar(),
            new MiniCssExtractPlugin({
                filename: 'css/app.css'
            }),
            new HtmlWebpackPlugin({
                template: 'public/index.html'
            }),
        ],

        optimization: {
            minimizer: [
              `...`,
              new CssMinimizerPlugin(),
            ],
        },

        devServer: {
            client: {
                overlay: true,
            },
            hot: true,
            port: 9000
        }
    }

    if(! isProduction) {
        config['devtool'] = 'source-map'
    }

    return config;
}