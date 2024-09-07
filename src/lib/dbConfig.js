import mongoose from 'mongoose';

const Connection = {
  isConnected: 0,
};

export async function dbConnect() {
  if (Connection.isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const dbResponse = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    Connection.isConnected = dbResponse.connections[0].readyState;
    console.log('Database connected successfully', dbResponse.connection.host);
  } catch (error) {
    console.error('Error while connecting to Database', error);
    process.exit(1);
  }
}