import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';

// MongoDB Atlas connection configuration using native MongoDB driver
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dailylens';
const client = new MongoClient(uri);

let db;

export async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db('dailylens');
  }
  return { client, db };
}

export const auth = betterAuth({
  database: {
    db: db || (await connectToDatabase()).db,
    type: 'mongodb',
  },
  emailAndPassword: {
    enabled: true,
  },
  user: {
    // Explicit Role-based Auth requirement: Standard sign ups default to 'user'
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'user',
      },
    },
  },
});
