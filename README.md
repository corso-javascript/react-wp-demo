# React Isomorphic Minimal

Example how to access to WP REST api with JavaScript ES6 + React

A minimal boilerplate for https://corso-javascript.it based on React Isomorphic Starterkit, see `package.json`

Run in development with:

```
npm install
npm run watch
```

Run in production with:

```
NODE_ENV=production PORT=8000 HOSTNAME=fino.local npm run start
```

Isomorphic starterkit with server-side React rendering using
[npm](https://www.npmjs.com),
[koa](http://koajs.com),
[webpack](https://webpack.github.io/),
[babel](http://babeljs.io),
[react](https://facebook.github.io/react),
[react-router](https://github.com/rackt/react-router),
[react-transform-hmr](https://github.com/gaearon/react-transform-hmr),
[react-transmit](https://github.com/RickWong/react-transmit),
[react-inline-css](https://github.com/RickWong/react-inline-css)

![version](https://img.shields.io/npm/v/react-isomorphic-starterkit.svg) ![license](https://img.shields.io/npm/l/react-isomorphic-starterkit.svg) [![Package Quality](http://npm.packagequality.com/shield/react-isomorphic-starterkit.svg)](http://packagequality.com/#?package=react-isomorphic-starterkit) ![installs](https://img.shields.io/npm/dt/react-isomorphic-starterkit.svg) ![downloads](https://img.shields.io/github/downloads/RickWong/react-isomorphic-starterkit/latest/total.svg)

## Features

- Fully automated toolchain with npm run scripts
- React 0.14 + React Router 1.0 on the client and server
- Babel 6 automatically compiles ES2015 + ES7 draft
- Webpack HMR for instant server updates
- React Transform HMR for instant client updates
- React Transmit to preload on server and hydrate client
- InlineCss-component for styling components

It just works out-of-the-box.

## Installation

Development

```bash
git clone https://github.com/RickWong/react-isomorphic-starterkit.git
cd react-isomorphic-starterkit

npm install
npm run watch     # Yes, ONE command for both server AND client development!
```

Production

```bash
npm run build
npm run start  
```

## Usage

Run `npm run watch` in your terminal and play with `views/Main.js` to get a feel of
the server-side rendering and client-side hot updates.

## Community

Let's start one together! After you ★Star this project, follow [@Rygu](https://twitter.com/rygu)
on Twitter.

## License

BSD 3-Clause license. Copyright © 2015, Rick Wong. All rights reserved.
