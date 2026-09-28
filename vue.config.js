const webpack = require('webpack')
// const StyleLintPlugin = require('stylelint-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  devServer: {
    port: '60001',
    writeToDisk: true,
    compress: false
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
          }),
          new webpack.ProvidePlugin({
            moment: 'moment'
          }),
          new webpack.DefinePlugin({
            VERSION: JSON.stringify(require('./package.json').version)
          }),
          // new StyleLintPlugin({
          //   files: ['src/**/*.{sss,scss}'],
          // }),
          new FaviconsWebpackPlugin({
            logo: './public/static/img/logo-shape.svg',
            // The prefix for all image files (might be a folder or a name)
            prefix: 'favicons/',
            // Emit all stats of the generated icons
            emitStats: false,
            // The name of the json containing all favicon information
            statsFilename: 'favicons.json',
            // Generate a cache file with control hashes and
            // don't rebuild the favicons until those hashes change
            persistentCache: true,
            // Inject the html into the html-webpack-plugin
            inject: true,

            theme_color: '#ffffff',
            // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
            background: '#376ccf',
            // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
            title: 'uBeac',

            // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
            icons: {
              android: {
                offset: 15,
                background: '#ffffff'
              },
              appleIcon: {
                offset: 15,
                background: '#ffffff'
              },
              appleStartup: {
                offset: 20,
                background: '#ffffff'
              },
              coast: true,
              favicons: {
                offset: 0,
                background: 'transparent'
              },
              firefox: true,
              opengraph: true,
              twitter: true,
              yandex: true,
              windows: true
            }
          })
        ]
      }
    } else {
      return {
        watchOptions: {
          aggregateTimeout: 300,
          poll: 1000
        },
        plugins: [
          new webpack.ProvidePlugin({
            moment: 'moment'
          }),
          new webpack.DefinePlugin({
            VERSION: JSON.stringify(require('./package.json').version)
          })
        ]
      }
    }
  },
  pwa: {
    name: 'uBeac',
    manifestPath: 'manifest.json',
    themeColor: '#376ccf',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#ffffff'
  },
  css: {
    // Enable CSS source maps.
    sourceMap: false
  }
}
