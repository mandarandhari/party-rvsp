const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const auth = require('../middlewares/auth');

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.post(
    '/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({email});

            if (!user) {
                return res.status(400).json({
                    msg: 'User does not exists'
                });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(400).json({
                    msg: 'Password not matching'
                });
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, process.env.SECRET, {
                expiresIn: 3600
            }, (e, token) => {
                if (e) throw e;

                res.send({ token })
            })
        } catch(err) {
            console.error(err.message)

            return res.status(500).send("Server Error")
        }
    }
)

module.exports = router;
