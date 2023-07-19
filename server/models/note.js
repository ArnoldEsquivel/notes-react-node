const { DataTypes } = require('sequelize');
const sequelize = require('./mysql');
const User = require('./user');

const Note = sequelize.define('note', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
}, {
    timestamps: true,
    freezeTableName: false,
    paranoid: true,
});

Note.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
Note.sync({ alter: true });

module.exports = Note;