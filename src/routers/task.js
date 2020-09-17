const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
var bodyParser = require('body-parser');

const router = new express.Router()

router.use(bodyParser.json({limit: '50mb'}));


//post task
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        // owner: req.user._id,
        owner: req.user.email
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//get all tasks list
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: '-createdAt' 
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }
    catch (e) {
        res.status(500).send('error')
    }
})


router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every(update =>
        allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ Error: 'inValid updates' })
    }
    try {
        const task = await Task.findOne({ _id: req.params.id })
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        res.send(task)
    }
    catch (e) {
        res.status(400).send(e)
    }
}) 


router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.email })
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router