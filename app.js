const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./util/database");

const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

sequelize
    .sync()
    .then(() => {
        console.log("DB is sync");
        app.listen(PORT, () => {
            console.log(`Server is runnig on PORT ${PORT}.`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
