const MemoryDatabaseServer = require('./helpers/memody-db-helper');

module.exports = async () => {
  await MemoryDatabaseServer.start();
};
