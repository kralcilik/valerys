import Cart from '../models/cartModule.js';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModule.js';

//@desc create new order
//@route POST /api/orders
//@access private
const addProductToCart = asyncHandler(async (req, res) => {
  const { product, quantity, user } = req.body;

  let newQ = quantity;
  const products = await Cart.find({});
  let cartAlreadyHasItem = false;
  // console.log(products);
  products.forEach((or) => {
    const str = or.product + '';
    console.log(str);
    if (str === product._id) {
      cartAlreadyHasItem = true;
      newQ = Number(newQ) + Number(or.quantity);
    }
  });
  let order = new Cart({ quantity, product });
  // console.log(product._id);
  // console.log(cartAlreadyHasItem);

  if (!cartAlreadyHasItem) await order.save();
  else {
    order = await Cart.findOne({ product });
    order.quantity = newQ;
    await order.save();
  }
  const pr = await Product.findById(product._id);
  pr.countInStock = Number(pr.countInStock) - Number(quantity);
  await pr.save();
  res.status(201).json(order);
});

const removeProductFromCart = asyncHandler(async (req, res) => {
  console.log('id: ' + req.params.id);
  let order = await Cart.findOne({ product: req.params.id });
  console.log(order);

  order.quantity = Number(order.quantity) - 1;
  await order.save();

  const pr = await Product.findById(req.params.id);
  pr.countInStock = Number(pr.countInStock) + 1;
  await pr.save();
  res.status(201).json(order);
});

const deleteAllCart = asyncHandler(async (req, res) => {
  console.log('request');
  await Cart.deleteMany();
  res.status(200).json({ msg: 'success' });
});

const getAllProductsFromCart = asyncHandler(async (req, res) => {
  const productsFromCart = await Cart.find({});
  const products = [];

  for (let i = 0; i < productsFromCart.length; i++) {
    const pra = await Product.findById(productsFromCart[i].product);
    products.push({
      product: pra,
      quantity: productsFromCart[i].quantity,
    });
  }
  console.log(products);
  res.json(products);
});

const removeItemFromCart = asyncHandler(async (req, res) => {
  const product = await Cart.findOne({ product: req.params.id });
  console.log('qty: ' + product.quantity);
  const p = await Product.findById(req.params.id);
  p.countInStock = product.quantity + p.countInStock;
  p.save();
  product.remove();
  res.status(200).json({ msg: 'success' });
});

export {
  addProductToCart,
  removeProductFromCart,
  deleteAllCart,
  getAllProductsFromCart,
  removeItemFromCart,
};
