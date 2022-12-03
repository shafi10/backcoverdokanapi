import { config } from '../config';
import * as Mongoose from 'mongoose';

export async function connectToDatabase() {
  await Mongoose.connect(config.dbURL!);
  const { connection } = Mongoose;
  connection.on('connected', () => {
    console.log('Success! Connected to MongoDB.');
  });

  connection.on('disconnected', () => {
    console.error('!!!!!!!!!! MongoDB Disconnected !!!!!!!!!!');
  });

  connection.on('reconnected', () => {
    console.warn('!!!!!!!!!! MongoDB Reconnected  !!!!!!!!!!');
  });

  connection.on('error', (error) => {
    console.error('Failed! MongoDB connection failed. \n', error);
  });
}

export function escapeRegex(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
