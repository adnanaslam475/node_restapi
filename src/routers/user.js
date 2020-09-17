const express = require('express');
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const { sendWelcomeEmail, sendByeEmail } = require('../db/account')


const router = new express.Router()

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

//register
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
        await user.save()
        sendWelcomeEmail(user.email, user.name)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send('logout successfully')
    }
    catch (e) {
        res.status(500).send({ error: 'authorization required ' })
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        // db.collection.user.tokens = []
        req.user.tokens = []
        await req.user.save()
        res.send('logoutALL successfully')
    }
    catch (e) {
        res.status(500).send('error')
    }
})


router.delete('/users/me', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id)
        await req.user.remove()
        sendByeEmail(req.user.email, req.user.name)
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ Error: 'inValid updates' })
    }
    try {
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

//login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send('please sign up First')
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
            return callback(new Error('please upload an image'))
        }
        callback(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('photos'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error
        }
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    }
    catch (e) {
        res.send("error", e)
    }
})


router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})
module.exports = router
// taskkill /F /IM node.exe