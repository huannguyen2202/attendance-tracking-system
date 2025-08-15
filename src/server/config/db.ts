// src/server/config/db.ts
import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var __mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables");
}

const DB_NAME = process.env.MONGODB_DB || "timekeeping_app";

// Nếu URI chưa có phần /<db>, tự thêm DB_NAME để tránh rơi vào "test"
function ensureDbInUri(uri: string, dbName: string) {
  // có path db sau hostname không? (vd ...mongodb.net/mydb)
  const hasDbPath = /^mongodb(\+srv)?:\/\/[^/]+\/[^/?]+/i.test(uri);
  if (hasDbPath) return uri; // đã có /<db>
  return `${uri.replace(/\/+$/, "")}/${dbName}`;
}

export async function connectDB() {
  if (!global.__mongoose) global.__mongoose = { conn: null, promise: null };
  if (global.__mongoose.conn) return global.__mongoose.conn;

  const uriWithDb = ensureDbInUri(MONGODB_URI, DB_NAME);

  if (!global.__mongoose.promise) {
    console.log("[DB] connecting...", { DB_NAME, uriHasDbPath: uriWithDb !== MONGODB_URI });
    global.__mongoose.promise = mongoose
      .connect(uriWithDb, { dbName: DB_NAME })
      .then((m) => {
        console.log("[DB] connected name =", m.connection.name); // ← sẽ là "timekeeping_app"
        return m;
      });
  }

  global.__mongoose.conn = await global.__mongoose.promise;
  return global.__mongoose.conn;
}
