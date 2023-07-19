const { DataTypes } = require('sequelize');
const sequelize = require('./mysql');
const Note = require('./note');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
}, {
    timestamps: true,
    freezeTableName: false,
    paranoid: true,
});

User.hasMany(Note, { foreignKey: 'user_id' });
User.sync({ alter: true });

module.exports = User;