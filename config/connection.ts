import mongoose from 'mongoose';

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/socialNetworkDB');
    console.log('Database Connected');
    return mongoose.connection
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
};

export default db;