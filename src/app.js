const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const { DatabaseService } = require('./services');
const routes = require('./routes');

class App {
  constructor() {
    this.express = express();

    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    DatabaseService.connect();
    DatabaseService.truncate();
  }

  middlewares() {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));

    this.express.use((req, res, next) => {
      // Website to connect to. * indicates 'all'
      res.setHeader('Access-Control-Allow-Origin', '*');
      // Methods to allow access
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      // Request headers to allow access
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      // Send cookies
      res.setHeader('Access-Control-Allow-Credentials', true);
      // Move on to the next layer
      next();
    });
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;