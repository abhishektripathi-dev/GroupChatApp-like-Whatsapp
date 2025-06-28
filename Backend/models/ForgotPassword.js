const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const User = require("./User");

const ForgotPassword = sequelize.define(
    "ForgotPassword",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        resetToken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        expiresby: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = ForgotPassword;
