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
    const message = await Message.findAll({
        attributes:["id", "username", "message"]
    });
    const user = await User.findAll({
        attributes: ["userName"],
    });

    const userName = user.map((user) => user.userName);

    // console.log(message)

    res.json({ userName, message });
};
