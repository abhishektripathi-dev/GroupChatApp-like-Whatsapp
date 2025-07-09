const { where } = require("sequelize");
const Group = require("../models/Group");
const GroupMember = require("../models/GroupMember");

exports.createGroup = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        const group = await Group.create({
            groupName: name,
            description,
            creatorId: req.user.id,
        });

        await GroupMember.create({
            userId: req.user.id,
            groupId: group.dataValues.id,
            role: "admin",
        });

        res.status(201).json(group);
    } catch (error) {
        console.log(
            "Error in group controller in createGroup function",
            error.message
        );
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getGroups = async (req, res, next) => {
    try {
        const groups = await GroupMember.findAll({
            where: { userId: req.user.id },
            include: [{ model: Group, attributes: ["groupName"] }],
        });
        console.log(groups);
        res.status(200).json(groups);
    } catch (error) {
        console.log(
            "Error in group controller in getGroups function",
            error.message
        );
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.checkAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const groupId = req.params.groupId;
        const member = await GroupMember.findOne({
            where: { userId, groupId, role: "admin" },
        });
        if (member) {
            return res.status(200).json({ isAdmin: true });
        } else {
            return res.status(200).json({ isAdmin: false });
        }
    } catch (error) {
        console.log(
            "Error in group controller in checkAdmin function",
            error.message
        );
        res.status(500).json({ message: "Internal Server Error" });
    }
};
