const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.generateToken = (user) => {
    const payload = { id: user.id, email: user.email };
    const secretKey = process.env.JWT_SECRET_KEY;
    console.log(payload, secretKey);

    if (!secretKey) {
        console.log(
            "JWT_SECRET_KEY is not defined in the environment variables"
        );
        throw new Error("Server configuration error");
    }

    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};
