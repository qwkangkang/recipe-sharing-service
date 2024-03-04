const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest} = require('../middleware/auth')

const Content = require('../models/Content')

// @desc  Login/Landing page
// @route GET /
router.get('/', ensureGuest, (req, res) =>{
    res.render('login',{
        layout: 'login'
    }) 
})

// @desc  Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) =>{
    //console.log(req.user)

    try {
        const contents = await Content.find({ user: req.user.id}).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            contents
        })
    } catch (err) {
        console.error(err)
        res.render('err/500')
    }

    
})



// router.get('*', (req, res) => {
//     console.log(`Requested URL: ${req.url}`);
//     res.status(404).send('Not Found in index.js');
//   });

module.exports = router