const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://omkardeshmane832:YZZwduAeKWaTyREi@cluster0.vhifpss.mongodb.net/bakeryDB?retryWrites=true&w=majority&appName=Cluster0'
    );
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
