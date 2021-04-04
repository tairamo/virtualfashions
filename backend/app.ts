import bP from "body-parser";
import express from "express";
import session from "express-session";
import cors from "cors";

const app = express();

app.options("*", cors());
app.set("port", process.env.PORT || 8000);
app.use(bP.json());
app.use(bP.urlenconded({ extended: false }));

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
  "http://virtualfashion.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
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

app.listen(app.get("port"), () => {
  console.log(
    "Virtual Fashion NFT Backend listening on port " + app.get("port")
  );
});

export { app };
