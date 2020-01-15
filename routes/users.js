var express = require('express');
var router = express.Router();



const User = require('../Model/userModel');

const auth = require('../Middleware/auth');
// Set default API response


router.post('/', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        // console.log(user);
        const token = await user.generateAuthToken()
        // console.log(token);
        res.status(201).json({ user, token })
    } catch (error) {
        res.status(400).json(error)
    }
});

router.post('/login', async(req, res) => {
    //Login a registered user
    // console.log('askhdhsadkj')
    try {
        const { email, password } = req.body
        // console.log('adasdsad')
        const user = await User.findByCredentials(email, password)
        // console.log(user);

        if (!user) {
            return res.status(401).json({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        // console.log(token);
        res.json({ user, token })
    } catch (error) {
        // console.log(error)
        res.status(400).json(error)

    }
    // console.log(res);

});

router.get('/me', auth, async(req, res) => {
    // View logged in user profile
    res.json(req.user)
});

router.post('/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).json(error)
    }
});

router.post('/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).json(error)
    }
});



module.exports = router;
