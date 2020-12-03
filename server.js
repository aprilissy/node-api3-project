const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
//const postRouter = require('./posts/postRouter');
const { logger } = require('./middleware/users-middleware');
const server = express();

server.use(logger);
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
