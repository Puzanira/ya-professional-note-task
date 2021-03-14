const mongoose = require('mongoose');

const DATABASE_PORT = process.env.DATABASE_PORT || 27017;
const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';

const connect = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      process.env.NODE_ENV === 'test' ? global.__DB_URL__
        : `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/mydb`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
    );
  }
};

const truncate = async () => {
  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection;

    const promises = Object.keys(collections).map(
      (collection) => mongoose.connection.collection(collection).deleteMany({}),
    );

    await Promise.all(promises);
  }
};

const disconnect = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};

module.exports = {
  connect,
  truncate,
  disconnect,
};
