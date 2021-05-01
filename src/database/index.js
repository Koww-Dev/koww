import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

mongoose.connect(`${process.env.NODE_ENV === 'test' ? process.env.DB_LINK_TEST.toString() : process.env.DB_LINK}`, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
});

mongoose.Promise = global.Promise;

export default mongoose;
