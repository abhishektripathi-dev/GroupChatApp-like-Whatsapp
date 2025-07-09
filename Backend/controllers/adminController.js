const Group = require("../models/Group");
const User = require("../models/User");
const GroupMember = require("../models/GroupMember");
const { where } = require("sequelize");

exports.addMember = async (req, res, next) => {
    const { phone, groupId } = req.body;
    try {
        // Find the user by phone number
        const user = await User.findOne({ where: { phone } });

        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "User not found" });
        }

        // Add the user as a member to the group
        await GroupMember.create({
            userId: user.id,
            groupId,
            role: "member",
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.log("Error in admin controller in addMember:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getMembers = async (req, res, next) => {
    const { groupId } = req.params;
    try {
        // Fetch all group members with user details for the given groupId
        const members = await GroupMember.findAll({
            where: { groupId: groupId },
            include: [{ model: User, attributes: ["id", "userName", "phone"] }],
        });

        // Format and send the response
        const formattedMembers = members.map((member) => ({
            userId: member.userId,
            userName: member.User?.userName,
            phone: member.User?.phone,
            role: member.role,
        }));

        res.json(formattedMembers);
    } catch (error) {
        console.log("Error in admin controller in getMembers:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.makeAdmin = async (req, res, next) => {
    const { userId, groupId } = req.body;

    try {
        // Update the role of the group member to 'admin'
        await GroupMember.update(
            { role: "admin" },
            { where: { groupId: groupId, userId: userId } }
        );

        res.json({ success: true });
    } catch (error) {
        console.log("Error in admin controller in makeAdmin:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.removeMember = async (req, res, next) => {
    const { groupId, userId } = req.params;
    try {
        // Find the group by ID
        const group = await Group.findOne({ where: { id: groupId } });

        // Prevent removing the group creator
        if (Number(group.creatorId) === Number(userId)) {
            return res.status(403).json({
                success: false,
                message: "Cannot remove the group creator.",
            });
        }

        // Remove the member from the group
        await GroupMember.destroy({
            where: { groupId, userId },
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.log(
            "Error in admin controller in removeMember:",
            error.message
        );
        res.status(500).json({ message: "Internal Server Error" });
    }
};
