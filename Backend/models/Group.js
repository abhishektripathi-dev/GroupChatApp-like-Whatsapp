const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Group = sequelize.define("Group", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    groupName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: DataTypes.STRING,
    creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Group;
