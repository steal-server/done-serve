[![Build Status](https://travis-ci.org/donejs/done-serve.svg?branch=master)](https://travis-ci.org/donejs/done-serve)
[![npm version](https://badge.fury.io/js/done-serve.svg)](http://badge.fury.io/js/done-serve)

# done-serve

A simple development server for DoneJS projects.

## Install

```
npm install done-serve
```

## Usage

To start a full server that hosts your application run:

```
node_modules/.bin/done-serve --port 3030
```

In your application folder.

Available options:

- __-p, --port__ - Set the port the server should run on
- __-d, --develop__ - Also starts a live-reload server
- __-r, --proxy__ <url> - Proxy a local path (default: `/api`) to the given URL (e.g. `http://api.myapp.com`)
- __-t, --proxy-to <path>__ - Set the proxy endpoint (default: `/api`)
- __--proxy-no-cert-check__ - Turn off SSL certificate verification

### In Node

You can also use the server, with the same options, from JavaScript:

```js
var server = require("done-serve");

server({
  path: "path/to/dir"
});
```

## License

MIT
