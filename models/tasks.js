'use strict';
module.exports = (sequelize, DataTypes) => {
  var tasks = sequelize.define('tasks', {
    tasks: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return tasks;
};