var getConfig = require('hjs-webpack')

module.exports = getConfig({
  in: 'src/app.js',
  out: 'public',
  clearBeforeBuild: true,
  port: 8000,
  html: function(context) {
    return context.defaultTemplate({publicPath: '/rom-area-designer/'})
  },
  serveCustomHtmlInDev: false
})
