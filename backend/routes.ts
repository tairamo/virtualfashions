import * as express from "express";

import usersRoutes from "./api/users/routes";

export default function fnSetRoutes(app) {
  const router = express.Router();

  usersRoutes(router);

  // Apply the routes to our application with the prefix 'api'
  app.use((req, res) => {
    res.status(404);

    // respond with html page
    if (req.accepts("html")) {
      res.render("404", { url: req.url });
      return;
    }

    // respond with JSON
    if (req.accepts("json")) {
      res.send({ errpr: "NOT FOUND" });
      return;
    }

    // default to plain-text.
    res.type("txt").send("NODT FOUND");
  });
}
