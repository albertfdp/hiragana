module.exports =
  process.env.NODE_ENV === 'production'
    ? require('./webpack.config.dev')
    : require('./webpack.config.prod');
