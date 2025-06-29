const { Op } = require("sequelize");

const Message = require("../models/Message");
const User = require("../models/User");

exports.addChat = async (req, res, next) => {
    const { message } = req.body;
    const email = req.user.email;

    try {
        const user = await User.findOne({ where: { email } });
        const userName = user.userName;
        const userId = user.id;

        const newMessage = await Message.create({ userName, message, userId });
        // console.log(newMessage);
    } catch (error) {
        console.log(error);
    }
};

exports.getChat = async (req, res, next) => {
    try {
        const lastId = req.query.id;
        let messages;

        if (lastId) {
            // Fetch messages with id greater than lastId
            messages = await Message.findAll({
                where: {
                    id: {
                        [Op.gt]: lastId,
                    },
                },
                attributes: ["id", "username", "message"],
            });
        } else {
            // Fetch all message
            messages = await Message.findAll({
                attributes: ["id", "username", "message"],
            });
        }

        const user = await User.findAll({
            attributes: ["userName"],
        });

        const userName = user.map((user) => user.userName);

        // console.log(message)

        res.json({ userName, message: messages });
    } catch (error) {
        console.log("Error in chat controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
