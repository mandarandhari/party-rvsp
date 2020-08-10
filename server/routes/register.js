const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').not().isEmpty(),
        check('email', 'Enter valid email').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        check('password', 'Password should be atleast 6 digit long').isLength({min: 6})
    ],
    async (req, res,next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({email});

            if (user) {
                return res.status(400).json({msg: "User already exists"});
            }
            
            user = new User({
                name: name,
                email: email,
                password: password
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, process.env.SECRET, {
                expiresIn: 3600
            }, (e, token) => {
                if (e) throw e;
                res.send({ token });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;