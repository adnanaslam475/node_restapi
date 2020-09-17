const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const Task = require('../../models/task')

const userOneID = new mongoose.Types.ObjectId()
const UserOne = {
    _id: userOneID,
    name: "adnan",
    email: 'aslamadnan68@gmail.com',
    password: 'adnanaslam',
    tokens: [{
        token: jwt.sign({ _id: userOneID }, process.env.jwtSecret)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const UserTwo = {
    _id: userTwoId,
    name: "waqar",
    email: 'adnanaslam475@gmail.com',
    password: 'adnanaslam475',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.jwtSecret)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'this is usertwo task 1',
    owner: UserTwo.email
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'this is usertwo task 2',
    owner: UserTwo.email
}
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'this is usertwo task 3',
    owner: UserOne.email
}

const setupdatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(UserOne).save()
    await new User(UserTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = { userOneID, UserOne, setupdatabase, UserTwo, taskOne, taskTwo, taskThree }