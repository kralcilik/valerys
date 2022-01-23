import Order from '../models/orderModule.js';
import asyncHandler from 'express-async-handler';

//@desc create new order
//@route POST /api/orders
//@access private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, totalPrice } = req.body;
  console.log(req);
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      orderItems,
      // user: req.user._id || null,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//@desc get order by id
//@route POST /api/orders/:id
//@access private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    // console.log(req.user.name);
    // console.log(order.user.name);
    // console.log(req.user._id);
    // console.log(order.user._id);
    console.log(req.user.id);
    console.log(order.user.id);
    console.log(req.user);
    if (req.user.id === order.user.id) {
      console.log('evet ayni id');
      res.status(200).json(order);
    } else {
      console.log('ayni id deil');
      console.log(req.user._id);
      console.log(order.user._id);
      res.status(404);
      throw new Error('user not the same not found');
    }
  } else {
    res.status(404);
    throw new Error('order not found');
  }
});

//@desc update order to paid
//@route POST /api/orders/:id/pay
//@access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_id,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('order not found');
  }
});

export { addOrderItems, getOrderById, updateOrderToPaid };
