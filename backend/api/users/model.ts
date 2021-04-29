import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  role: { type: String, default: "USER" },
  accountId: String,
  name: String,
  username: String,
  bio: String,
  profileImage: String,
  coverImage: String,
  email: String,
  facebook_link: String,
  instagram_link: String,
  twitch_link: String,
  youtube_link: String,
  discord_link: String,
  twitter_link: String,
  tiktok_link: String,
  website_link: String,
  snapchat_link: String,
  isCreator: Boolean,
});

const Users = mongoose.model("Users", usersSchema);

export default Users
