const express = require('express');
const { validateUserId, validateUser, validatePost } = require('../middleware/users-middleware')
const Users = require('./userDb')
const Posts = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, async (req, res, next) => {
  try {
    const newUser = await Users.insert(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try {
    const { id } = req.params; 
    const text = req.body;
    const payload = {...text, user_id:id}    
    const newPost = await Posts.insert(payload)
    res.status(201).json(newPost)
  } catch (error) {
    next(error)
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.get()
    res.status(200).json(users)
  } catch (error) {
      next(error)
  }
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try {
  const { id } = req.params;
  const usersPosts = await Users.getUserPosts(id);
  res.status(200).json(usersPosts);
} catch (error) {
  next(error);
}
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('id',id);
    
    const delUser = await Users.remove(id);
    res.status(200).json({ message: `The user with id ${id} has been deleted`})
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validateUserId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    console.log('body',req.body);
    
    const editUser = await Users.update(id, changes)
    res.status(200).json(editUser)
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: 'something awful happened!!!!!!!!',
    error: err.message,
  });
});

module.exports = router;
