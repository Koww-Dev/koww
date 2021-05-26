import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

class AppController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(userRoutes);
  }
}

export default new AppController().express;
