const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateUser } = require('../validators/userValidator');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for authenticating users
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "exampleUser"
 *               password:
 *                 type: string
 *                 example: "examplePass"
 *     responses:
 *       200:
 *         description: User added successfully
 *         content:
 *           application/json:
 *             example:
 *               token: "your.jwt.token"
 *       400:
 *         description: Bad request - User already exists
 *         content:
 *           application/json:
 *             example:
 *               msg: "User already exists"
 */

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
        next(err);
    }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "exampleUser"
 *               password:
 *                 type: string
 *                 example: "examplePass"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               token: "your.jwt.token"
 *       400:
 *         description: Bad request - Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               "msg": "Invalid credentials"
 */

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
        next(err);
    }
});

module.exports = router;
