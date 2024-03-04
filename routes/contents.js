const express = require('express')
const router = express.Router()
const { ensureAuth} = require('../middleware/auth')

const Content = require('../models/Content')

// @desc  Show add page
// @route GET /contents/add
router.get('/add', ensureAuth, (req, res) =>{
    res.render('contents/add')
})

// @desc  Process add form
// @route POST /contents
router.post('/', ensureAuth, async (req, res) =>{
    try {
        req.body.user = req.user.id
        await Content.create(req.body)
        res.redirect('/dashboard')
    } catch (error) {
        res.render('error/500')
    }
})

// @desc  Show all contents
// @route GET /
router.get('/', ensureAuth, async (req, res) =>{
    try {
        const contents = await Content.find({status: 'public'})
            .populate('user')
            .sort({createAt: 'desc'})
            .lean()

        res.render('contents/index', {contents})
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})

// @desc  Show single story
// @route GET /contents/:id
router.get('/:id', ensureAuth, async(req, res) =>{
    try {
        let content = await Content.findById(req.params.id)
        .populate('user')
        .lean()

        if(!content){
            return res.render('error/404')
        }

        res.render('contents/show',{
            content
        })
    } catch (error) {
        console.log(error)
        res.render('error/404')
    }
})

// @desc  Show edit page
// @route GET /contents/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) =>{
    try {
        const content = await Content.findOne({
            _id: req.params.id
        }).lean()
    
        if(!content){
            return res.render('error/404')
        }
    
        if(content.user != req.user.id){
            res.redirect('/contents')
        }else{
            res.render('contents/edit',{
                content,
            })
        }
    } catch (error) {
        console.log(error)
        return res.render('error/500')
    }
    
})


// @desc  Update content
// @route PUT /contents/:id
router.put('/:id', ensureAuth, async(req, res) =>{
    try {
        let content = await Content.findById(req.params.id).lean()

        if(!content){
            return res.render('error/404')
        }

        if(content.user != req.user.id){
            res.redirect('/contents')
        }else{
            content = await Content.findOneAndUpdate({_id: req.params.id }, req.body, {
                new: true, //if doesn't exist
                runValidators: true
            })

            res.redirect('/dashboard')
        }
    } catch (error) {
        console.log(error)
        return res.render('error/500')
    }
    
})

// @desc  Delete content
// @route DELETE /contents/:id
router.delete('/:id', ensureAuth,async (req, res) =>{console.log('going to delete')
    try {
        await Content.deleteOne({ _id: req.params.id})
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
        return res.render('error/500')
    }
})

// @desc  user contents
// @route GET /contents/user/:userId
router.get('/user/:userId', ensureAuth, async(req, res) =>{
    try {
        const contents = await Content.find({
            user: req.params.userId,
            status:'public' 
        })
        .populate('user')
        .lean()

        res.render('contents/index',{
            contents
        })
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
})

module.exports = router