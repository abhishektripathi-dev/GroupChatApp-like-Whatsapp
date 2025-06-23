const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const sequelize = require("./util/database");

const userRoutes = require("./routes/userRoutes");

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

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
