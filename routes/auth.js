const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
    console.log(req.body);
    try {
        const { fullName, email, password } = req.body;

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ msg: "user with same email already exist" });
        } else {
            // Generate a salt with a cost factor of 10
            const salt = await bcrypt.genSalt(10);
            console.log("SALT", salt);
            // hash the password using the generated salt
            const hashPassword = await bcrypt.hash(password, salt);
            console.log("HASHED PASS", hashPassword);
            let user = new User({ fullName, email, password: hashPassword });
            user = await user.save();
            res.json({ user });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = authRouter;
