const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// database configuration
const sequelize = require("./utils/database");

// Models
const User = require("./models/User");
const ForgotPassword = require("./models/ForgotPassword");
const Message = require("./models/Message");
const Group = require("./models/Group");
const GroupMember = require("./models/GroupMember");

const PORT = process.env.PORT;

const app = express();
// app.use(cors());
app.use(
    cors({
        origin: "http://127.0.0.1:3000", // your frontend's origin
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require("./routes/userRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const groupRoutes = require("./routes/groupRoutes");
const adminRoutes = require("./routes/adminRoutes");

// const chatRoutes = require("./routes/chatRoutes");

app.use("/api/auth", userRoutes);
app.use("/api/auth", passwordRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/admin", adminRoutes);

// Association
User.hasMany(ForgotPassword, { foreignKey: "userId" });
ForgotPassword.belongsTo(User, { foreignKey: "userId" });

Group.hasMany(GroupMember, { foreignKey: "groupId" });
GroupMember.belongsTo(Group, { foreignKey: "groupId" });
GroupMember.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Message, { foreignKey: "userId" });
Message.belongsTo(User, { foreignKey: "userId" });

Group.hasMany(Message, { foreignKey: "groupId" });
Message.belongsTo(Group, { foreignKey: "groupId" });

sequelize
    // .sync({ force: true })
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
