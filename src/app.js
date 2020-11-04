import { resolve } from 'path';
import dotenv from 'dotenv';
import delay from 'express-delay';

dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import './database';
import homeRoutes from './routes/homeRoutes';
import studentRoutes from './routes/studentRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import photoRoutes from './routes/photoRoutes';

const whiteList = [
  'https://back.luisapiresttwo.ml',
  'https://react2.luisapiresttwo.ml',
  'http://35.198.52.232',
  'http://localhost:3002',
  'http://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(delay(2000));
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/students/', studentRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/photos/', photoRoutes);
  }
}

export default new App().app;
