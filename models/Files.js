'use strict';
module.exports = (sequelize, DataTypes) => {
    var files = sequelize.define('files', {
        filename: DataTypes.STRING,
        description: DataTypes.STRING,
        displayname: DataTypes.STRING,
        file: DataTypes.BIGINT
    });
    return files;
};