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
let textRegex = /^[^=*<>{}]+$/;


/***** CREATE COMMENT *****/
exports.newComment = (req, res, next) => {
  //vérification des données
  try {
    if (req.body.content === "") throw "Veuillez renseigner un contenu";
    if (req.body.content.length < 2) throw "Votre commentaire doit contenir au moins 2 caractères";
    if (!textRegex.test(req.body.content)) throw "Caractères spéciaux utilisés interdits  * < > { }";
  } catch (error) {
    return res.status(400).json({
      error: error
    });
  }
  //creation authorisée du commentaire
  sequelize.Comment.create({
      UserId: req.body.UserId,
      PostId: req.body.PostId,
      content: req.body.content,
    })
    .then(response => res.status(200).json({
      message: "Commentaire bien crée",
      response: response
    }))
    .catch(error => res.status(400).json({
      error: "Le commentaire n'a pas pu être crée"
    }));
}


// /***** FIND ALL COMMENTS *****/
// exports.getAllComments = (req, res, next) => {
//   //récupération de tous les commentaires présents dans la bdd
//   sequelize.Comment.findAll({
//       where: {
//         UserId: req.body.UserId
//       },
//       order: [
//         ['createdAt', 'DESC']
//       ]
//     })
//     .then(comments => {
//       console.log(comments);
//       res.status(200).json(comments);
//     })
//     .catch(error => res.status(400).json({
//       error
//     }));
// }


/***** UPDATE COMMENT *****/
exports.updateOneComment = (req, res, next) => {

  //vérifcation des données
  try {
    if (req.body.content === "") throw "Veuillez renseigner un contenu";
  } catch (error) {
    return res.status(400).json({
      error: error
    });
  }
  //modification du commentaire
  sequelize.Comment.update({
      content: req.body.content
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(response => res.status(200).json({
      message: "Commentaire bien modifié"
    }))
    .catch(error => console.log("ERREUR updateValue"));
}



/***** DELETE COMMENT *****/
exports.deleteOneComment = (req, res, next) => {
  sequelize.Comment.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(comment => {
      console.log(comment);
      res.status(200).json({
        message: "Commentaire bien supprimé"
      });
    })
    .catch(error => res.status(400).json({
      error
    }));
}



/***** FIND ONE USER LAST COMMENTS *****/
exports.getUserComments = (req, res, next) => {
  //récupération de tous les posts présents dans la bdd
  sequelize.Comment.findAll({
      where: {
        UserId: req.params.id
      },
      order: [
        ['createdAt', 'DESC']
      ],
      limit: 5
    })
    .then(comments => {
      console.log(comments);
      res.status(200).json(comments);
    })
    .catch(error => res.status(400).json({
      error
    }));
}