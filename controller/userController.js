const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const User = require('../model/userModel');

//User Sign Up Route

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ msg: "User Already Registered", status: 400 });
        } else {
            const hashedPwd = await bcrypt.hash(password, 10);
            const user = await User.create({
                name, email, password: hashedPwd
            })
            if (user) {
                res.status(201).json({ msg: "Sign Up Successful", status: 201 });
            }
        }
    } catch (error) {
        res.status(400).json({ msg: "Failed To Sign Up", status: 400 })
    }
}

//User Login Route

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const isPwdMatch = await bcrypt.compare(password, user.password)
            if (isPwdMatch) {
                const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET)
                res.status(200).json({ msg: "Login Successfully...", token, status: 200 })
            } else {
                res.status(400).json({ msg: "Password Does Not Match...", status: 400 })
            }
        } else {
            res.status(400).json({ msg: "User Does Not Exists", status: 400 })
        }
    } catch (error) {
        res.status(400).json({ msg: "Failed To Login", status: 400 })
    }
}

//Verify Route
const verify = (req, res) => {
    res.status(200).json({ msg: "Verified", status: 200 })
}

module.exports = { signup, login, verify };