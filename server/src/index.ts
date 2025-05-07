import express from "express";
import mongoose from 'mongoose';
import { json } from "body-parser";
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { getUserRouter } from './routes/getUser';
import { errorHandler, NotFoundError } from "@ntatickets/common";
import cookieSession from "cookie-session";
import cors from "cors";
import { config } from "dotenv";
import { uploadImagesRouter } from "./routes/uploadImages";
const app = express();
app.set('trust proxy', true);
config(); // Load environment variables from .env file
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);
app.use(json());
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from localhost:3000
  // credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(getUserRouter);
app.use(uploadImagesRouter);

app.all('*', async (req, res) => {
  console.log('Route not found', req.path);
  // throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  console.log('Starting up...', process.env.MONGO_URI, process.env.PICS_GMAIL_USER, process.env.PICS_GMAIL_PASSWORD);
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log('Connected to MongoDb');

  } catch (err) {
    console.error(err);
  }

  app.listen(3001, () => {
    console.log('Listening on port 3001!!!!!!!!');
  });
};

start();
