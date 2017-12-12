'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    usernmae: DataTypes.STRING,
    lastname: DataTypes.STRING,
      id:{
          type:DataTypes.INTEGER,
          primaryKey: true
      },
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users;
};