const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

// Set environments for webpack and babel based on script run
const LAUNCH_COMMAND = process.env.npm_lifecycle_event
const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

const PATHS = {
  app: path.resolve(__dirname, 'app'),
  build: path.resolve(__dirname, 'dist')
}


// Define Plugins
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
})

const HMRpluginConfig = new webpack.HotModuleReplacementPlugin()

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

// Base Config
const baseConfig = {
  entry: [
    PATHS.app
  ],
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {
            loader:'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'app'), 'node_modules']
  }
}

// Development Config
const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: false,
    historyApiFallback: true,
  },
  plugins: [
    HTMLWebpackPluginConfig,
    HMRpluginConfig
  ]
}

// Production Configuration
const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [
    HTMLWebpackPluginConfig,
    productionPlugin
  ]
}

export default Object.assign({}, baseConfig,
  isProduction === true ? productionConfig: developmentConfig
)
