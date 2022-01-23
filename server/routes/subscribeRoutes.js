import express from 'express';
import { subscribeEmail } from '../controllers/subscribeController.js';
const router = express.Router();

router.route('/:id').post(subscribeEmail);

export default router;
