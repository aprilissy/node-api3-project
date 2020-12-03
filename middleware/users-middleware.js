const Users = require('../users/userDb')

const logger = (req, res, next) => {
  console.log('logger method: ',req.method);
  console.log('logger url: ',req.url);
  const time = Date.now()
  console.log('logger timestamp: ',time);
  
  console.timeStamp();  
  next();
}

const validateUserId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the user'});
  }
};

function validateUser(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: 'missing user data'})
  } else if (!req.body.name) {
    res.status(400).json({ message: 'missing required name field'})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: 'missing post data'})
  } else if (!req.body.text) {
    res.status(400).json({ message: 'missing required text field'})
  } else {
    next()
  }
}

//, req.url, req.timestamp
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}