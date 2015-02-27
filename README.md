# karma-triflejs-launcher

> Launcher for TrifleJS (developer version).

## Installation

The easiest way is to keep `karma-triflejs-launcher` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-triflejs-launcher": "~0.0.6"
  }
}
```

You can simple do it by:
```bash
npm install karma-triflejs-launcher --save-dev
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['trifleJS'],
  });
};
```

You can pass list of browsers as a CLI argument too:
```bash
karma start --browsers trifleJS,Chrome
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
