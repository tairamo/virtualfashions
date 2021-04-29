import express from "express";

import fnUsersRoutes from "./api/users/routes";

export default function fnSetRoutes(app) {
  const router = express.Router();

  fnUsersRoutes(router);

  app.use("/", router);
  
  // Apply the routes to our application with the prefix 'api'
  app.use((req, res, next) => {
    res.status(404);

    // respond with html page
    if (req.accepts("html")) {
      res.render("404", { url: req.url });
      return;
    }

    // respond with JSON
    if (req.accepts("json")) {
      res.send({ error: "NOT FOUND" });
      return;
    }

    // default to plain-text.
    res.type("txt").send("NOT FOUND");
  });
  
  // All other routes should redirect to the index.html
  app.get('/*', function (req, res) {
    res.json({welcome: "Welcome to Virtual Fashion, an NFT marketplace"});
  });
}
