const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateUser } = require('../validators/userValidator');

router.post('/register', validateUser, async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ username, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: { id: user.id }
        };

        jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 3600 }, 
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        next(error);
    }
});

router.post('/login', validateUser, async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 3600 }, 
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        next(error);
    }
});

module.exports = router;
