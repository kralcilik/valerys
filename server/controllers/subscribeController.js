import asyncHandler from 'express-async-handler';
import Subscribe from '../models/subscribeModule.js';
//@desc create new order
//@route POST /api/orders
//@access private
const subscribeEmail = asyncHandler(async (req, res) => {
  const email = req.params.id;
  const alreadyEmail = await Subscribe.findOne({ email });
  if (alreadyEmail) res.json({ data: 'already' });
  else {
    let newEmail = new Subscribe({ email });
    await newEmail.save();
    res.json({ data: `new email: ${email}` });
  }
});

export { subscribeEmail };
