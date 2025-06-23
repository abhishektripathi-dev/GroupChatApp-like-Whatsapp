const bcrypt = require("bcrypt");
const User = require("../models/User");
const { where } = require("sequelize");

exports.signup = async (req, res, next) => {
    try {
        const { fullName, email, password, phone } = req.body;

        const user = await User.findOne({ where: { email } });

        if (user)
            return res.status(400).json({ message: "User already exists" });

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            phone,
        });

        return res
            .status(201)
            .json({ success: true, message: "Signup successfully" });
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
