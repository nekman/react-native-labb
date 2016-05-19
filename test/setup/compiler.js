const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const origJs = require.extensions['.js'];

require.extensions['.js'] = (module, fileName) => {
  if (fileName.indexOf('node_modules/react-native/Libraries/react-native/react-native.js') >= 0) {
    /* eslint no-param-reassign: "off" */
    fileName = path.resolve('./test/setup/mocks/react-native.js');
  }
  if (fileName.indexOf('node_modules/') >= 0) {
    return (origJs || require.extensions['.js'])(module, fileName);
  }
  const src = fs.readFileSync(fileName, 'utf8');
  const output = babel.transform(src, {
    filename: fileName,
    presets: ['es2015', 'react']
  }).code;

  /* eslint no-underscore-dangle: "off" */
  return module._compile(output, fileName);
};
