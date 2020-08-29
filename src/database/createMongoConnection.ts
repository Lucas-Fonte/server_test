import mongoose from 'mongoose';

const createMongoConnection = async () => {
  const mongoConnection = await mongoose
    .connect(process.env.MONGO_URI)
    .catch(() => ({
      message: 'Service Unavailable',
    }));
  console.log('Connected to Mongo');
  return mongoConnection;
};

const closeMongoConnection = () => {
  mongoose.connection.close();
};
export { createMongoConnection, closeMongoConnection };
