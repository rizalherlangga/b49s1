'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Projets.init({
    name: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    description: DataTypes.TEXT,
    technologies: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Projets',
  });
  return Projets;
};