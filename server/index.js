import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './app.js';
import { connectDb } from './connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDb();
  } catch (err) {
    console.warn('[Server Boot] MongoDB initial connection failed, starting server in fallback mode:', err.message);
  }

  app.listen(PORT, () => {
    console.log(`[API Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
