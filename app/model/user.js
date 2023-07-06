'use strict';

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(15),
    password:STRING(30),
  },{tableName: 'users',timestamps: false});

  return User;
};