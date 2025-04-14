import express from 'express';
import { User } from '../models/user';

const router = express.Router();

router.get('/api/users/:id', async (req, res) => {
  console.log('Getting user', req.params.id);
  const user = await User.findById(req.params.id);
  console.log('User', user);
  if (!user) {
    return res.status(404).send({});
  }
  res.send(user);
});

export { router as getUserRouter };
