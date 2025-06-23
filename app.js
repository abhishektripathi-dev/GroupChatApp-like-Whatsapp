const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// database configuration
const sequelize = require("./utils/database");

// Models
const User = require("./models/User");
const ForgotPassword = require("./models/ForgotPassword");

// Routes
const userRoutes = require("./routes/userRoutes");
const passwordRoutes = require("./routes/passwordRoutes");

const PORT = process.env.PORT;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/auth", passwordRoutes);

// Association
User.hasMany(ForgotPassword, { foreignKey: "userId" });
ForgotPassword.belongsTo(User, { foreignKey: "userId" });

sequelize
    .sync()
    .then(() => {
        console.log("Database synced successfully.");
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        );
    })
    .catch((err) => {
        console.error("Error syncing database:", err);
    });
