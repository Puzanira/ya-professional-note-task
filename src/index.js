const app = require('./app');
require('dotenv').config();

const PORT = process.env.NODE_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Notes tool listening at http://localhost:${PORT}`);
});