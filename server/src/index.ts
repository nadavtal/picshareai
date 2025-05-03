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
import { uploadImagesRouter } from "./routes/uploadImages";
const app = express();
app.set('trust proxy', true);

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
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
