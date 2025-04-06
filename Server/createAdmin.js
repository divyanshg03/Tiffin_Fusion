import mongoose from 'mongoose';
import User from "./models/user.model.js";

const createAdmin = async () => {
  await mongoose.connect("mongodb+srv://arkabasak62:1234@cluster0.i3bju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

  const adminUser = {
    username: 'admin4',
    email: 'admin4@gmail.com',
    password: 'admin1234',
    isAdmin: true,
  };

  try {
    const newAdmin = new User(adminUser);
    await newAdmin.save();
    
    console.log('Admin user created successfully!');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
