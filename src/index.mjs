import pool from "./database.mjs";
import express from "express";
import passport from "passport";
import session from "express-session";
import pgSimpleSession from "connect-pg-simple";
const pgSession = pgSimpleSession(session);
import "./helpers/local-strategy.mjs"

const app = express();
app.use(express.json());
app.use(session({
    secret: "secretislam",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: new pgSession({
      pool: pool,
      tableName: "session",
    })
}))
app.use(passport.initialize());
app.use(passport.session());

const appStart = () => {
  try {
      app.listen(8000, () => {
          console.log(`Server running on port 8000`);
      });
  } catch (error) {
      console.log(`Error: ${error}`);
  }
}

appStart();

//ok