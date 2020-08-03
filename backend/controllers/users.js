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

//recherche de l'utilisateur
let mailRegex = /.+@.+\..+/;
let nameRegex = /^[^=*'<>{}0-9]{3,}$/;
let passwordRegex = /^[^=*'<>{}]{5,}$/;
let textRegex = /^[^=*<>{}]+$/;


/**** find one user ****/
exports.getUsername = (req, res, next) => {
  sequelize.User.findOne({
      where: {
        id: req.params.id
      },
      attributes: ["id", "firstname", "lastname", "admin", "createdAt"]
    })
    .then(user => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(error => console.log(error));
}

/**** find all users ****/
exports.getAllUsers = (req, res, next) => {
  sequelize.User.findAll({
      attributes: ["id", "firstname", "lastname", "admin", "createdAt"]
    })
    .then(user => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(error => console.log(error));
}


/***** USER LOGIN *****/
exports.login = (req, res, next) => {
  //vérification des inputs
  try {
    if (req.body.mail === "") throw "Veuillez renseigner un mail";
    if (req.body.mdp === "") throw "Veuillez renseigner un mot de passe";
    if (!passwordRegex.test(req.body.mdp)) {
      throw "Le mot de passe doit contenir au moins 5 caractères et ne doit pas contenir les caractères suivants: =*<>{}"
    }
    if (!mailRegex.test(req.body.mail)) {
      throw "Veuillez entrer une adresse mail valide";
    }
  } catch (error) {
    return res.status(400).json({
      error: error
    });
  }
  //les inputs correspondent aux données attendues, recherche de l'utilisateur
  sequelize.User.findOne({
      where: {
        mail: req.body.mail
      }
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: "Utilisateur non trouvé"
        })
      }
      //utilisateur trouvé, comparaison des mdp
      bcrypt.compare(req.body.mdp, user.mdp)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              error: "Password invalide"
            })
          }
          //mdp valide, envoi d'un token d'authentification
          res.status(200).json({
            userId: user.id,
            userRole: user.admin,
            userFirstname: user.firstname,
            userLastname: user.lastname,
            token: jwt.sign({
                userId: user.id,
                userRole: user.admin,
              },
              'MY_SECRET_TOKEN', {
                expiresIn: '24h'
              })
          })
        })
        .catch(error => res.status(500).json({
          error: "erreur bcrypt"
        }));
    })
    .catch(error => console.log(error));
}



/***** USER DELETE *****/
exports.deleteAccount = (req, res, next) => {
  //vérification des inputs
  try {
    if (req.body.mail === "") throw "Veuillez renseigner un mail";
    if (req.body.mdp === "") throw "Veuillez renseigner un mot de passe";
    if (!passwordRegex.test(req.body.mdp)) {
      throw "Mot de passe incorrect"
    }
    if (!mailRegex.test(req.body.mail)) {
      throw "Veuillez vérifier votre adresse mail";
    }
  } catch (error) {
    return res.status(400).json({
      error: error
    });
  }
  //recherche de l'utilisateur
  sequelize.User.findOne({
      where: {
        mail: req.body.mail
      }
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: "Utilisateur non trouvé"
        })
      }
      //utlisateur est trouvé, comparaison des mots de passe
      bcrypt.compare(req.body.mdp, user.mdp)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              error: "Le mot de passe ne correspond pas"
            })
          }
          //suppression de l'utilisateur
          sequelize.User.destroy({
              where: {
                mail: req.body.mail
              }
            })
            .then(() => res.status(201).json({
              message: "Utilisateur bien supprimé"
            }))
            .catch(error => res.status(400).json({
              error: "l'utilisateur n'a pas pu être supprimé"
            }));
        })
        .catch(error => res.status(500).json({
          error: "erreur bcrypt"
        }));
    })
    .catch(error => console.log(error));
}




/***** USER Auth admin delete *****/
exports.deleteAccountAuth = (req, res, next) => {
  //vérification des inputs

  //recherche de l'utilisateur
  sequelize.User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: "Utilisateur non trouvé"
        })
      }
      //utlisateur est trouvé, suppression de l'utilisateur
      sequelize.User.destroy({
          where: {
            id: user.id
          }
        })
        .then(() => res.status(201).json({
          message: "Utilisateur bien supprimé"
        }))
        .catch(error => res.status(400).json({
          error: "L'utilisateur n'a pas pu être supprimé"
        }));
    })
    .catch(error => console.log(error));
}


exports.signup = (req, res, next) => {
  db.sequelize.sync()
    .then(() => {
      sequelize.User.findOne({
          where: {
            mail: req.body.mail
          }
        })
        .then(user => {
          if (user) {
            return res.status(401).json({
              error: "Utilisateur deja existant"
            })
          }
          //le mail n'est pas utilisé
          //vérifications des données
          try {
            if (req.body.lastname === "") throw "Veuillez renseigner un nom";
            if (req.body.firstname === "") throw "Veuillez renseigner un prénom";
            if (!nameRegex.test(req.body.firstname)) throw "Prénom non valide (trop court ou utilise des chiffres, caractères spéciaux)";
            if (!nameRegex.test(req.body.lastname)) throw "Nom non valide (trop court ou utilise des chiffres, caractères spéciaux)";
            if (req.body.mail === "") throw "Veuillez renseigner un mail";
            if (!passwordRegex.test(req.body.mdp)) {
              throw "Le mot de passe doit contenir au moins 5 caractères et ne doit pas contenir les caractères suivants: =*'<>{}"
            }
            if (!mailRegex.test(req.body.mail)) {
              throw "Veuillez entrer une adresse mail valide";
            }
          } catch (error) {
            return res.status(400).json({
              error: error
            });
          }

          //hashage du mot de passe
          let hash = bcrypt.hashSync(req.body.mdp, 10);

          //déclaration des données
          let lastname = req.body.lastname;
          let firstname = req.body.firstname;
          let mail = req.body.mail;
          let mdpHash = hash;
          let admin = 0;

          //création de l'utilisateur

          if (req.body.lastname !== "" && req.body.firstname !== "" && req.body.mail !== "") {
            console.log('database connected...');
            sequelize.User.create({
                lastname: lastname,
                firstname: firstname,
                mail: mail,
                mdp: mdpHash,
                admin: admin
              })
              .then(() => res.status(201).json({
                message: "Utilisateur bien crée"
              }))
              .catch(error => console.log("erreur"));
          } else {
            return res.status(400).json({
              message: "champs vide !"
            });
          }

        })
        .catch(error => res.status(500).json({
          error
        }));
    })
    .catch(error => console.log(error));
}