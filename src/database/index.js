import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/tests',
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false });
mongoose.Promise = global.Promise;

export default mongoose;
