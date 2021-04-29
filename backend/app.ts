import bP from "body-parser";
import express from "express";
import session from "express-session";
import mongoose from "mongoose"
import cors from "cors";

import fnSetRoutes from "./routes";

const app = express();

app.options("*", cors());
app.set("port", process.env.PORT || 8000);
app.use(bP.json());
app.use(bP.urlencoded({ extended: false }));

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
  "http://virtualfashion.io",
];

app.use(
  cors({
    origin: function (origin: string | any, callback: Function | any) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        const msg =
          "The CORS policy for this site does not allow access for this specified origin: " +
          origin;
        return callback(new Error(msg), false);
      }
    },
  })
);

// mongoose.connect(process.env.MONGODB_URI);
const uri = "mongodb+srv://dedaldino:deda1221@cluster0.yxfzm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri).catch(err => console.log(err))
const db = mongoose.connection;
(<any>mongoose).Promise = global.Promise;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", ()=>{
  console.log("Connected to MongoDB");

  fnSetRoutes(app);
  
  app.listen(app.get("port"), () => {
    console.log(
      "Virtual Fashion NFT Backend listening on port " + app.get("port")
    );
  });
})

export { app }
