import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  dbURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/medEasy',
  jwtSecret: 'jwtSecret',
  apiUrl: 'https://bazarapi.onrender.com',
};
