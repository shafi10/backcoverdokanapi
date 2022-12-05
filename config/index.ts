import * as dotenv from 'dotenv';
dotenv.config();

//all config variables
export const config = {
  dbURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/medEasy',
  jwtSecret: 'jwtSecret',
  apiUrl: process.env.API_URL || 'https://ecom-back-cover.onrender.com',
};
