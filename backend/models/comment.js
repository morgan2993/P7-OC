'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT
  }, {});
  Comment.associate = function(models) {
    models.Comment.belongsTo(models.Post,{
      onDelete: 'CASCADE',
      hooks: true
    });
    models.Comment.belongsTo(models.User,{
      onDelete: 'CASCADE',
      hooks: true,
    });
  
  };
  return Comment;
};