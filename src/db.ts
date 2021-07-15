import mongoose from 'mongoose';

// Initialize connection to mongodb
export const connectDb = async (uri: string) => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
}
