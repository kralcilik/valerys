// import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModule.js';
import Product from './models/productModule.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    console.log(dotenv);
    const createdUsers = await User.insertMany(users);
    console.log(products);
    const adminUser = createdUsers.find(
      (createdUser) => createdUser.isAdmin === true
    );
    await Product.deleteMany();

    await Product.insertMany(products);
    console.log(products);

    console.log('Data Imported');
    process.exit();
  } catch (err) {
    console.log(`${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    console.log('Data destroyed');
    process.exit();
  } catch (err) {
    console.log(`${err}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

//npm run data:import import data
