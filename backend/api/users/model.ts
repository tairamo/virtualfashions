import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  role: { type: String, default: "USER" },
  accountId: String,
  name: String,
  username: String,
  bio: String,
  profileImage: Buffer,
  coverImage: Buffer,
});

const Users = mongoose.model("Users", usersSchema);
export default Users;
