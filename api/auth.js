import { betterAuth } from 'better-auth';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bandhan_paribar';

let client;
let db;

function getDatabase() {
  if (!db) {
    client = new MongoClient(uri);
    db = client.db();
  }
  return db;
}

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || 'piGlBJxLgjmLHRqzMWQFoWA3n8UAHaY7',
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:5173',
  database: mongodbAdapter(getDatabase()),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'user',
      },
    },
  },
});
