const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');

const Guest = require('../models/Guest');

router.get('/', auth, async (req, res) => {
    try {
        const guests = await Guest.find({user_id: req.user.id});

        res.json(guests);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

router.post(
    '/',
    auth,
    [
        check('name', 'Name is required').not().isEmpty(),
        check('phone', 'Phone is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { name, phone, dietary, isconfirmed } = req.body;

        try {
            let guest = new Guest({
                user_id: req.user.id,
                name,
                phone,
                dietary,
                isconfirmed
            });

            guest = await guest.save();

            res.json(guest);
        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Server error");
        }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        let guest = await Guest.findById(req.params.id);

        if (!guest) {
            return res.status(404).json({
                msg: "Guest does not exists"
            });
        }

        await Guest.findByIdAndDelete(req.params.id);

        res.send("Guest deleted");
    } catch (error) {
        console.errors(error.message);
        res.status(500).send("Server error");
    }
});

router.put('/:id', auth, async (req, res) => {
    const { name, phone, dietary, isconfirmed } = req.body;

    try {
        let guest = await Guest.findById(req.params.id);

        if (!guest) {
            return res.status(404).json({
                msg: "Guest does not exists"
            });
        }

        guest = await Guest.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: name,
                    phone: phone,
                    dietary: dietary,
                    isconfirmed: isconfirmed
                }
            },
            {
                new: true //To get updated data
            }
        );

        res.json(guest);
    } catch (error) {
        console.errors(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;