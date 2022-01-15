// vue.config.js
module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: require.resolve('@open-wc/webpack-import-meta-loader'),
        },
      ],
    },
  }
}