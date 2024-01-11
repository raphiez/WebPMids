// models.js
import { Model, DataTypes } from "https://deno.land/x/denodb@1.4.0/mod.ts";
import db from "./db.js";

class User extends Model {
  static table = "users";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  };
}

db.link([User]);
await db.sync();
