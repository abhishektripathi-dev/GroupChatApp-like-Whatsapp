const bcrypt = require("bcrypt");
const User = require("../models/User");
const { where } = require("sequelize");
const { generateToken } = require("../utils/generateJWToken");

exports.signup = async (req, res, next) => {
    try {
        const { name: userName, phone, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            userName,
            email,
            phone,
            password: hashedPassword,
        });

        return res
            .status(201)
            .json({ success: true, message: "Signup successfully" });
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.login = async (req, res, next) => {
    const { phone, password } = req.body;

    try {
        const user = await User.findOne({ where: { phone } });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        return res.status(200).json({
            message: "User login successful",
            token: generateToken(user),
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
