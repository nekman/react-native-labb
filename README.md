# React Native Lab

Just writing down my experience when settings up a new RN project for the first time.
New to both React and React Native :)

Running OSX (10.11.4) with<br>
```node --version``` => 4.2.2<br>
```npm --version``` => 3.5.3


## Developing

```npm run test``` - Runs mocha tests<br>
```npm run coverage``` - Runs code coverage<br>
```npm run eslint``` - Runs eslint<br>

## Problems so far

#### 2016-05-15
##### Unit test
I want to be able to test my code using Mocha, sinon and Enzyme.
Found a great blog post describing how this could be done: <a href="https://blog.formidable.com/unit-testing-react-native-with-mocha-and-enzyme-51518f13ba73">https://blog.formidable.com/unit-testing-react-native-with-mocha-and-enzyme-51518</a>

However, some parts did not work. When I got my test to run and pass, my app crashed with an error message saying (something like this):

```
Unable to find this module in its module map or any of the node_modules directories under /Users/node_modules/${k} and its parent directories

This might be related to https://github.com/facebook/react-native/issues/4968
To resolve try the following:
  1. Clear watchman watches: 'watchman watch-del-all'.
  2. Delete the 'node_modules' folder: 'rm -rf node_modules && npm install'.
  3. Reset packager cache: 'rm -fr $TMPDIR/react-*' or 'npm start -- --reset-cache'.
2016-03-29 13:22:54.467 [error][tid:com.facebook.react.RCTBridgeQueue][RCTWebSocketExecutor.m:85] Runtime is not ready for debugging.
 - Make sure Packager server is running.
- Make sure Chrome is running and not paused on a breakpoint or exception and try reloading again.
2016-03-29 13:23:07.347 [fatal][tid:main] Unable to resolve module ${k} from /Users/code/myapp/actions/state-store.js: Unable to find this module in its module map or any of the node_modules directories under /Users/node_modules/${k} and its parent directories

This might be related to https://github.com/facebook/react-native/issues/4968
To resolve try the following:
  1. Clear watchman watches: 'watchman watch-del-all'.
  2. Delete the 'node_modules' folder: 'rm -rf node_modules && npm install'.
  3. Reset packager cache: 'rm -fr $TMPDIR/react-*' or 'npm start -- --reset-cache'.
```
I _think_ that the problem was that I've added a ```.babelrc``` (needed to use the  ```babel-preset-es2015``` and ```babel-preset-react``` to run my unit tests) that messed up something when RN was using babel.

**Solution**
<br>
I removed the ```.babelrc``` file and changed ```test/setup/compiler.js``` to
```javascript
babel.transform(src, {
  filename: fileName,
  presets: ['es2015', 'react']
});
```

And everything started to work again.

#### ESLint
Added ```eslint-config-airbnb``` and ```eslint-plugin-react ```

To prevent ESLint to say ```no-unused-vars``` using:
```javascript
const Hello = require('./Hello');
// Hello should not be treated as a unused variable
<Hello name="John" />;
```
The following rules was added to ```.eslintrc```
```json
"react/jsx-uses-react": 1,
"react/jsx-uses-vars": 1
```
It is now possible to lint the code using:<br>
https://github.com/airbnb/javascript
https://github.com/airbnb/javascript/tree/master/react

#### Get rid of warnings

```Warning: React.createElement: type should not be null, undefined, boolean, or number. It should be a string (for DOM elements) or a ReactClass (for composite components).```

**Solution**

Before:
```javascript
import React, { Text, View } from 'react-native';
```
After:
```javascript
import React from 'react';
import { Text, View } from 'react-native';
```

#### Fix "TypeError: Cannot set property 'StyleSheet' of undefined"

Solution https://github.com/nekman/react-native-labb/commit/21b581824faa716221798d8118660767e6c9d9f5#diff-6b7ca9615e36af45b6a644e0904bb90eR2

#### 2016-05-19
#### Add code coverage
Some problems to get code coverage to work.

Tried isparta but it does not write any coverage file, just runs unit
tests and prints:

```No coverage information was collected, exit without writing coverage information```

**Temporary solution:**<br>
Use istanbul@1.0.0-alpha.2

```istanbul cover _mocha -- --compilers js:test/setup/compiler.js```


#### Update to latest version

https://github.com/facebook/react-native/releases/tag/v0.26.0

```npm install -g rnpm && npm install rnpm-plugin-upgrade@0.26 --save-dev```

```rnpm upgrade```

Done!

#### Unable to start simulator after renaming/moving files

Strange error. For now, it have worked to
re-generate the project files (it will prompt before overwriting)

```react-native init GithubApp```

See https://github.com/facebook/react-native/issues/4968
