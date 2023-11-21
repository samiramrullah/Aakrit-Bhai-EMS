const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const mongoose = require('mongoose')
const userScheme = require('../../models/user')

router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!name || !email || !password || !validator.isEmail(email) || !passwordRegex.test(password)) return res.status(400).json({ message: 'Invalid data' })
        const user = await userScheme.findOne({ email })
        if (user) return res.status(400).json({ message: 'Email Already Exist' })
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        const newUser = new userScheme({ _id: new mongoose.Types.ObjectId, name, email, password: hashedpassword });
        newUser.save();
        res.status(201).json({ message: "User successfully registered." })
    } catch (error) {
        return res.status(401).json({ message: 'failed to Regsiter' });
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log('====================================');
        console.log(email, password );
        console.log('====================================');
        if (!email || !password ) return res.status(400).json({ message: 'Invalid Credentials' });
        const user = await userScheme.findOne({ email });
       
        if (!user || ! bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        console.log('====================================');
       console.log("here");
       console.log('====================================');
        const token = jwt.sign({ userId: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.status(200).json({ message: 'Successfully Logged in', token });
    } catch (error) {
        return res.status(401).json({ message: 'Failed to login' });
    }
});


module.exports = router;