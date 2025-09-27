const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('../config/db');
const Service = require('../models/Service');

const services = [
  { title: 'Plumbing', description: 'Fix leaks', category:'Plumbing', price:499 },
  { title: 'Cleaning', description: 'Deep cleaning', category:'Cleaning', price:999 },
  // add more (copy data from your HTML cards)
];

const importData = async () => {
  try {
    await connectDB();
    await Service.deleteMany();
    await Service.insertMany(services);
    console.log('Seed completed');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
