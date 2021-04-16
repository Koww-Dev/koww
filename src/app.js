import express from 'express';

class AppController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json);
  }

  // routes() {
  //   this.express.use(require('./routes/session.routes'));
  // }
}

export default AppController;
