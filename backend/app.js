const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('./models/index.js');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const db = require('./models');
const helmet = require('helmet');

const app = express();

app.use(helmet()); 

//Erreurs de cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

//enregistre routers
app.use('/user', require('./routes/user'));
app.use('/upload', require('./routes/upload'));
app.use('/posts', require('./routes/posts'));
app.use('/comments', require('./routes/comments'));

module.exports = app;