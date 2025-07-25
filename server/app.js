const express = require("express");
require("dotenv").config();
const db = require("./db");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
}));

// Routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/categoryRoutes"));
app.use("/api", require("./routes/serviceRoutes"));

const { User, sequelize } = db;

sequelize.sync({ alter: true }).then(async () => {
    const [admin, created] = await User.findOrCreate({
        where: { email: "admin@codesfortomorrow.com" },
        defaults: {
            password: await bcrypt.hash("Admin123!@#", 10), 
        },
    });

    if (created) {
        console.log("Admin user created.");
    } else {
        console.log("Admin user already exists.");
    }

    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
}).catch(err => {
    console.error("Database sync failed:", err);
});
