const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authRole = require('../middleware/authRole');
const multer = require('../middleware/multer-config');

const posts = require('../controllers/posts');
const db = require('../models');


const {
    Sequelize,
    DataTypes,
    Model
  } = require('sequelize');

router.get('/', auth, posts.getUserWall);
router.get('/:id', auth, posts.getOnePost);
router.post('/new',auth, posts.newPost);
router.put('/:id', auth, posts.updateOnePost);
router.delete('/:id', auth, posts.deleteOnePost);

router.get('/user/:id', auth, posts.getUserPosts); 
router.delete('/admin/:id', auth, authRole, posts.deleteOnePost);


module.exports = router;