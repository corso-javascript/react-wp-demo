import babelPolyfill from "babel-polyfill";
import koa from "koa";
import koaStatic from "koa-static";
import koaRouter from "koa-router";
import koaBody  from 'koa-body';
import React from "react";
import ReactDOM from "react-dom/server";
import fs from 'fs'

import Main from './containers/Main'

try {
	const app      = koa();
	const router   = koaRouter()
	const body 		 = koaBody()
	const hostname = process.env.HOSTNAME || "localhost";
	const port     = process.env.PORT || 3000;

	// const mongoUrl = process.env.MONGOURL || 'localhost:27017/mydb'

	// load env config
	const configFile =  `${process.env.NODE_ENV||'development'}.json`
	console.log(`\n==> Load config: ${configFile}`)
	global.AppRoot = process.cwd()
	global.Config = JSON.parse(fs.readFileSync(`${AppRoot}/configs/${configFile}`))

	app.use(koaStatic("static"));
	// getmdl - material-ui mount
	app.use(koaStatic("node_modules/material-design-lite"));
	// app.use(koaStatic("."));
	app.use(router.routes())

	// GET /example
	router.get('/example', function *(next) {

		// async flow example
		const willReturn = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(new Date().getTime())
			}, 1000)
		})

		let date = yield willReturn

		this.body = `
		<!doctype html>
		<html lang="en">
			<h3>${date}</h3>
			<pre>
			${JSON.stringify(this, null,2)}
			</pre>
		</html>
		`
	});

	// Main React component
	router.get('/', function *(next) {
		const webserver = process.env.NODE_ENV === "production" ? "" : "//" + hostname + ":8080";

		let reactString = ReactDOM.renderToStaticMarkup(<Main />)
		let template = (
			`
			<!doctype html>
			<html lang="en">
			  <head>
			    <meta charset="utf-8">
			    <meta http-equiv="X-UA-Compatible" content="IE=edge">
			    <meta name="description" content="A front-end template that helps you build fast, modern mobile web apps.">
			    <meta name="viewport" content="width=device-width, initial-scale=1">
			    <title>Ebook Lorem Ipsum</title>

			    <!-- Add to homescreen for Chrome on Android -->
			    <meta name="mobile-web-app-capable" content="yes">

			    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en">
			    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
					<link rel="stylesheet" href="/material.min.css">
					<script src="/material.min.js"></script>

					<link rel="stylesheet" href="/styles.css">
			  </head>
			  <body>
			    <div class="demo-layout mdl-layout mdl-layout--fixed-header mdl-js-layout mdl-color--grey-100">
			      <header class="demo-header mdl-layout__header mdl-layout__header--scroll mdl-color--grey-100 mdl-color-text--grey-800">
			        <div class="mdl-layout__header-row">
			          <span class="mdl-layout-title">Esempio App <small> - corso-javascript.it</small></span>
			          <div class="mdl-layout-spacer"></div>
			        </div>
			      </header>
			      <div class="demo-ribbon"></div>
			      <main class="demo-main mdl-layout__content">
			        <div class="demo-container mdl-grid">
			          <div class="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
			          <div class="demo-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col">

										<div id="react-root" class="container">${reactString}</div>

			          </div>
			        </div>
			      </main>

						<footer class="mdl-mini-footer">
						  <div class="mdl-mini-footer__left-section">
						    <div class="mdl-logo">Startup Secrets</div>
						    <ul class="mdl-mini-footer__link-list">
						      <li><a href="#">Privacy</a></li>
									<li><a href="#">Transazioni</a></li>
									<li>- Un'applicazione d'esempio di <a href="https://">corso-javascript.it</a></li>
									<li>${(__DEV__) ? 'DEV' : ''}</li>
						    </ul>
						  </div>
						</footer>

			    </div>

					<script>
						window.Config = {}
						Config.public = ${JSON.stringify(Config.public)}
					</script>

					<script src="${webserver}/dist/client.js"></script>

			  </body>
			</html>
			`
		);

		this.type = "text/html";
		this.body = template;

	});


	// start
	app.listen(port, () => {
		console.info("==> ✅  Server is listening");
		console.info("==> 🌎  Go to http://%s:%s", hostname, port);
	});

	if (__DEV__) {
		if (module.hot) {
			console.log("[HMR] Waiting for server-side updates");

			// module.hot.accept("containers/routes", () => {
			// 	routes = require("containers/routes");
			// });

			module.hot.addStatusHandler((status) => {
				if (status === "abort") {
					setTimeout(() => process.exit(0), 0);
				}
			});
		}
	}
}
catch (error) {
	console.error(error.stack || error);
}
