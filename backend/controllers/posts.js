const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  Sequelize,
  DataTypes,
  Model
} = require('sequelize');
const sequelize = require('../models/index.js');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const db = require('../models');
const fs = require('fs');

let textRegex = /^[^=*<>{}]+$/;

/***** FIND ALL POSTS *****/
exports.getUserWall = (req, res, next) => {
  //récupération de tous les posts présents dans la bdd
  sequelize.Post.findAll({
      include: [{
          model: sequelize.User,
          attributes: ["firstname", "lastname", "admin"]
        },
        {
          model: sequelize.Comment,
          include: [{
            model: sequelize.User,
            attributes: ["firstname", "lastname", "admin"]
          }]
        }
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    })
    .then(posts => {
      console.log(posts);
      res.status(200).json(posts);
    })
    .catch(error => res.status(400).json({
      error
    }));
}

/***** NEW POSTS *****/
exports.newPost = (req, res, next) => {
  //vérifications des données
  try {
    if (req.body.content === "" || req.body.content == null) throw "Veuillez renseigner un contenu";
    if (req.body.title === "" || req.body.content == null) throw "Veuillez renseigner un titre";
    if (req.body.title.length < 3) throw "Titre de 3 caractères minimum";
    if (req.body.content.length < 3) throw "Contenu de 3 caractères minimum";
    if (!textRegex.test(req.body.content)) throw "Caractères spéciaux utilisés interdits  * < > { }";
    if (!textRegex.test(req.body.title)) throw "Caractères spéciaux utilisés interdits  * < > { }"
  } catch (error) {
    return res.status(400).json({
      error: error
    });
  }

  //test si image, si pas d'image, imageUrl null
  let imageUrl = null;
  if (req.body.image) {
    imageUrl = `${req.protocol}://${req.get('host')}/images/${req.body.image}`
  }
// console.log(imageUrl);
  // creation d 'un nouveau post
  sequelize.Post.create({
      UserId: req.body.UserId,
      title: req.body.title,
      content: req.body.content,
      url_image: imageUrl
    })
    .then(response => res.status(200).json({
      message: "Post bien crée"
    }))
    .catch(error => res.status(400).json({
      error: "Ce post n'a pas pu être crée"
    }));
}


/***** GET ONE POSTS *****/
exports.getOnePost = (req, res, next) => {
  //récupération d'un post avec ses commentaires
  sequelize.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [{
          model: sequelize.User,
          attributes: ["firstname", "lastname"]
        },
        {
          model: sequelize.Comment,
          include: [{
            model: sequelize.User,
            attributes: ["firstname", "lastname", "id"]
          }]
        }
      ],
    })
    .then(post => {
      console.log(post);
      res.status(200).json(post);
    })
    .catch(error => res.status(400).json({
      error
    }));
}


/***** DELETE ON POST *****/
exports.deleteOnePost = (req, res, next) => {
  sequelize.Post.findOne({
      where: {id: req.params.id}})
    .then(post => {

      //if post.url_image === null
      if(post.url_image === null){
        sequelize.Post.destroy({where: {id: req.params.id}})
          .then(post => {res.status(200).json({
              message: "Post bien supprimé"
            });
          })
          .catch(error => res.status(400).json({
            error
          }));
      //if post.url_image
      }else {
        const filename = post.url_image.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          sequelize.Post.destroy({where: {id: req.params.id}})
            .then(post => {res.status(200).json({
                message: "post bien supprimé"
              });
            })
            .catch(error => res.status(400).json({
              error
            }));
          })
      }
    })
    .catch(error => res.status(500).json({
      error
    }));
}


/***** UPDATE ONE POST *****/
exports.updateOnePost = (req, res, next) => {
  //vérication des données
  try {
    if (req.body.content === "") throw "Veuillez renseigner un contenu";
    if (req.body.title === "") throw "Veuillez renseigner un titre";
  } catch (error) {
    return res.status(400).json({
      error: error
    });
  }
  //modification du post
  sequelize.Post.update({
      title: req.body.title,
      content: req.body.content,
      url_image: req.body.url_image
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(response => res.status(200).json({
      message: "Post bien modifié"
    }))
    .catch(error => console.log("ERREUR updateValue"));
}


/***** FIND ONE USER LASTS POSTS *****/
exports.getUserPosts = (req, res, next) => {
  //récupération de tous les posts présents dans la bdd
  sequelize.Post.findAll({
      where: {
        UserId: req.params.id
      },
      order: [
        ['createdAt', 'DESC']
      ],
      limit: 5
    })
    .then(posts => {
      console.log(posts);
      res.status(200).json(posts);
    })
    .catch(error => res.status(400).json({
      error
    }));
}