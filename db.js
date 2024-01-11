// db.js
import { DataTypes, Database } from "https://deno.land/x/denodb/mod.ts"; // Use the latest version

const db = new Database(new SQLite3Connector({
  filepath: "./blog.db", // Adjust the path as needed
}));

export default db;
