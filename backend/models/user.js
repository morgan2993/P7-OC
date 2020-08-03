'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT,
    mail: DataTypes.TEXT,
    mdp: DataTypes.TEXT,
    admin: DataTypes.INTEGER
  }, {});
  User.associate = function (models) {
    models.User.hasMany(models.Post, {
      onDelete: 'CASCADE'
    });
    models.User.hasMany(models.Comment, {
      onDelete: 'CASCADE'
    });
  };
  return User;
};