import app from '../server/app.js';
import { connectDb } from '../server/connection.js';

export default async function handler(req, res) {
  try {
    await connectDb();
  } catch (err) {
    console.warn('[Vercel Serverless] MongoDB connection warning:', err.message);
  }
  return app(req, res);
}
