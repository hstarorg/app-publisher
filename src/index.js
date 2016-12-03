'use strict';
require('shelljs/global');
const http = require('http');
const path = require('path');
const express = require('express');
const template = require('art-template-plus');
const router = require('./router');
const app = express();
// config template engine
template.config('base', '');
template.config('extname', '.html');
// define view engine
app.engine('html', template.__express);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(router);

let server = http.createServer(app);
server.listen(1001);
server.on('error', err => {
  console.error(err);
});
server.on('listening', () => {
  let addr = server.address();
  console.info(`Server started...port: ${addr.port}`);
});