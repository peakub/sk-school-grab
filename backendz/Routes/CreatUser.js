const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "userlnwza007$#"

router.post("/creatuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            const existingUser = await User.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] });
            if (existingUser) {
                return res.status(400).json({ errors: [{ msg: 'Email or phone number already exists' }] });
            }
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                phone: req.body.phone
            }).then(res.json({ success: true }))

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct credentials" })
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging with correct credentials" })
            }

            const data = {
                user:{
                    id: userData.id
                }
            }

            const authToken = jwt.sign(data, jwtSecret)

            return res.json({ success: true, authToken: authToken })

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

module.exports = router;