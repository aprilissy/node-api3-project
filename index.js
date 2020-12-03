const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 5000
const server = require('./server');

server.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
