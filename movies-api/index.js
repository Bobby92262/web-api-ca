import dotenv from 'dotenv';
import express from 'express';
import './db';
import cors from 'cors';
//... other imports
import usersRouter from './api/users';
import moviesRouter from './api/movies';
import authenticate from './authenticate';
import favouritesRouter from "./api/favourites/index";
import reviewRouter from "./api/reviews/index";



dotenv.config();

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const app = express();

// Enable CORS for all requests
app.use(cors());

const port = process.env.PORT;

app.use(express.json());

app.use(errHandler);

//Users router
app.use('/api/users', usersRouter);

//Movies Router
app.use('/api/movies',moviesRouter);

//Favourites Router
app.use("/api/favourites", authenticate, favouritesRouter);

//Reviews Router
app.use("api/reviews", reviewRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
