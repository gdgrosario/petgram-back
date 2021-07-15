import { createServer } from 'http';

import { connectDb } from './db';
import { setupExpressApp } from './http/app';

const dbUrl = process.env.DB_URL || 'localhost';
const dbPort = process.env.DB_PORT || 27017;
const serverPort = process.env.PORT || 3000;

const mongoDbUri = `mongodb://${dbUrl}:${dbPort}/petgram`;

// Connects database before starting the server
connectDb(mongoDbUri)
  .then(async () => {
    const app = await setupExpressApp();
    const server = createServer(app);
    server.listen(serverPort, () => {
      console.log(`Server started on port ${serverPort}`);
    });
  })
  .catch(console.error);
