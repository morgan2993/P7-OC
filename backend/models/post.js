'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
    url_image: DataTypes.TEXT,
  }, {});
  Post.associate = function (models) {
    models.Post.belongsTo(models.User,{
      onDelete: 'CASCADE',
      hooks: true
    });
    models.Post.hasMany(models.Comment, {
      onDelete: 'CASCADE'
    });
  };
  return Post;
};