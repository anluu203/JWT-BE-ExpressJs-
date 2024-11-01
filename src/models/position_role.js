'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class position_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  position_role.init({
    positionId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'position_role',
  });
  return position_role;
};