const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const authenticate = (req, res, next) => {
    // The question mark (?.) is the optional chaining operator in
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res
            .status(401)
            .json({ message: "Access token missing or invalid" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = authenticate;

// The question mark (?.) is the optional chaining operator in JavaScript.
// It safely accesses the authorization property of req.headers only if it exists.

// Why use it here?

// If req.headers.authorization is undefined or missing,
// req.headers.authorization.split(" ") would throw an error.
// With ?., if authorization is undefined, the whole expression returns undefined instead of crashing.
// Example:

// If authorization exists: splits the string and gets the token.
// If authorization is missing: returns undefined (no error thrown).
// Summary:
// It prevents runtime errors if the authorization header is not present in the request.
