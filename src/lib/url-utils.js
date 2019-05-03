const { replace, pipe, toLower } = require('ramda');

exports.slugify = pipe(
  replace(/\s/g, '-'),
  toLower,
)
