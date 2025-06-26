const Message = require("../models/Message");
const User = require("../models/User");

exports.chatMsgToDb = async (req, res, next) => {
    const { message } = req.body;
    const email = req.user.email;

    try {
        const user = await User.findOne({ where: { email } });
        const userName = user.userName;
        const userId = user.id;

        const newMessage = await Message.create({ userName, message, userId });
        console.log(newMessage);
    } catch (error) {
        console.log(error);
    }
};
