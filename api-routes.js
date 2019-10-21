// api-routes.js
// Initialize express router
let router = require('express').Router();

const User = require('./Model/userModel');

const auth = require('./Middleware/auth');
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import contact controller
var contactController = require('./Controller/contactController');
// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);



router.post('/users', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).json({ user, token })
    } catch (error) {
        res.status(400).json(error)
    }
});

router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).json({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.json({ user, token })
    } catch (error) {
        res.status(400).json(error)
    }

});

router.get('/users/me', auth, async(req, res) => {
    // View logged in user profile
    res.json(req.user)
});

router.post('/users/me/logout', auth, async (req, res) => {
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

router.post('/users/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).json(error)
    }
});



// Export API routes
module.exports = router;