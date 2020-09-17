const request = require('supertest')
const app = require('../app')
const Task = require('../models/task')
const { UserOne, UserTwo, taskOne, taskTwo, taskThree, setupdatabase } = require('./fixtures/db')



beforeEach(setupdatabase)

//test 12
test('task should be created', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${UserOne.tokens[0].token}`)
        .send({
            description: 'this is from test suite'
        }).expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
})

test('should not delete other users tasks', async () => {
     await request(app)
        .delete(`/tasks/${taskThree._id}`)
        .set('Authorization', `Bearer ${UserTwo.tokens[0].token}`)
        .send()
        .expect(404)
})

//test 13
test('should get two tasks', async () => {
    await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${UserTwo.tokens[0].token}`)
        .send()
        .expect()
    // expect(response.body.length).toEqual(0)
    // const task = await Task.findOne({ email: UserTwo.email })
    // expect(response.body.length).toBe(2)
})

//test 14
test('should update task', async () => {
    await request(app)
        .patch(`/tasks/${taskTwo._id}`)
        .set('Authorization', `Bearer ${UserTwo.tokens[0].token}`)
        .send({
            description: 'adnanaaslamnnwaqar'
        }).expect(200)
    // const user = await User.findById(UserOne._id)
    // expect(user.name).toEqual('adnanaaslamnnwaqar')
})
