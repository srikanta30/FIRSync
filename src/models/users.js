const constant = require("../constants/constants");

module.exports = (sequelize, DataType) => {
  const users = sequelize.define(
    constant.DB.table.USER_MASTER,
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
      },
      phone: {
        type: DataType.BIGINT,
        allowNull: false,
      },
      aadhar: {
        type: DataType.BIGINT,
        allowNull: false,
      },
      role: {
        type: DataType.ENUM,
        values: ["ADMIN", "USER"],
        allowNull: false
      },
      createdAt: {
        allowNull: true,
        type: DataType.BIGINT,
      },
      updatedAt: {
        allowNull: true,
        type: DataType.BIGINT,
      },
    },
    {
      hooks: {
        beforeCreate: (record, options) => {
          record.dataValues.createdAt = Math.floor(Date.now());
          record.dataValues.updatedAt = Math.floor(Date.now());
        },
        beforeUpdate: (record, options) => {
          record.dataValues.updatedAt = Math.floor(Date.now());
        },
        beforeBulkUpdate: (record, options) => {
          record.attributes.updatedAt = Math.floor(Date.now());
        },
        beforeBulkCreate: (record, options) => {
          record.dataValues.createdAt = Math.floor(Date.now());
          record.dataValues.updatedAt = Math.floor(Date.now());
        },
      },
    }
  );

  return users;
};
