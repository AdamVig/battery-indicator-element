const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const ENV = process.argv.find(arg => arg.includes('production')) ? 'production' : 'development'

const babelPresetEnvOptions = {
  targets: {
    esmodules: true
  },
  useBuiltIns: false,
  // we use fast-async, it's faster than regenerator
  exclude: ['transform-async-to-generator', 'transform-regenerator']
}

const templateHtmlMinifierOptions = {
  modules: {
    'lit-html': ['html'],
    'lit-element': ['html', { name: 'css', encapsulation: 'style' }]
  },
  htmlMinifier: {
    collapseWhitespace: true
  }
}

const config = {
  entry: './main.ts',
  resolve: {
    extensions: ['.js', '.ts']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), 'dist')
  },
  module: {
    rules: [
      {
        test: /\.svg$/i,
        use: 'raw-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', babelPresetEnvOptions]],
              plugins: [
                // Minify HTML and CSS in tagged template literals
                ['template-html-minifier', templateHtmlMinifierOptions],
                // fast async uses Promise instead of regenerator to compile async functions
                'module:fast-async'
              ]
            }
          },
          { loader: 'ts-loader' }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html', inject: true })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: true
      })
    ]
  },
  devtool: ENV === 'development' ? 'inline-source-map' : 'source-map',
  devServer: {
    contentBase: process.cwd(),
    compress: true,
    port: 8080,
    historyApiFallback: true,
    stats: 'errors-only'
  }
}

if (ENV === 'production') {
  config.plugins.unshift(new CleanWebpackPlugin())
}

module.exports = config
