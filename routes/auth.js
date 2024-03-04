const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc  Auth wif Google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile']}))

// @desc  Google auth callback
// @route GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google',
{ failureRedirect: '/'}), (req, res) =>{
    res.redirect('/dashboard')
})



// router.get('*', (req, res) => {
//     console.log(`Requested URL: ${req.url}`);
//     res.status(404).send('Not Found in auth.js');
//   });


// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) =>{
    req.logout(req, error =>{
        if(error) return next(error)
        res.redirect('/')
    }) 
    //res.redirect('/')
})


module.exports = router