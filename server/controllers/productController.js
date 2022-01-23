import Product from '../models/productModule.js';
import asyncHandler from 'express-async-handler';

//@desc fetch a single product
//@route GET /api/products/:id
//@access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

//@desc fetch products by brand
//@route GET /api/products
//@access public

const getProductByBrand = asyncHandler(async (req, res) => {
  console.log(req.query);
  const product = await Product.find({ brand: req.query.brand });

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc fetch a single product
//@route GET /api/products/:id
//@access public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc delete a product
//@route DELETE /api/products/:id
//@access private/admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc create a product
//@route POST /api/products
//@access private/admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpeg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description lorem43',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc update a product
//@route PUT /api/products/:id
//@access private/admin

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  console.log('nope product ' + req.params.id);
  const product = await Product.findById(req.params.id);
  if (product) {
    console.log('yes product');
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('product not found');
  }
});
//@desc fetch products by category
//@route GET /api/products
//@access public

const getProductByCategory = asyncHandler(async (req, res) => {
  console.log(req.query);
  const product = await Product.find({ category: req.query.category });

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const getProductBySpecial = asyncHandler(async (req, res) => {
  const products = await Product.find();
  const special = req.query.special;
  const arr = [];
  if (products) {
    products.forEach((p) => {
      const specials = p.specials;
      specials.forEach((s) => {
        if (s === special) arr.push(p);
      });
    });
    console.log(arr);
    res.json(arr);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc fetch products
//@route GET /api/products/:productName
//@access public

const searchProducts = asyncHandler(async (req, res) => {
  const searchQ = req.query.productName;
  const regex = new RegExp(searchQ, 'gi');
  const products = await Product.find();

  let arr = [];
  if (products && products.length > 0) {
    products.forEach((product) => {
      if (product.name.match(regex) && arr.length < 10) arr.push(product);
    });
  }
  if (searchQ.trim() === '') arr = [];

  res.json(arr);
});

export {
  getProductById,
  getProducts,
  updateProduct,
  createProduct,
  deleteProduct,
  getProductByCategory,
  getProductByBrand,
  searchProducts,
  getProductBySpecial,
};
