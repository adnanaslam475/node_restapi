const request = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { userOneID, UserOne, setupdatabase } = require('./fixtures/db')


beforeEach(setupdatabase)

//test 0
test('user should be sign up', async () => {
    await request(app).post('/users').send({
        name: 'adnanaslam',
        email: 'adnanaslam4758@gmail.com',
        password: 'adnan123'
    }).expect(201)
})



//test 1
test('user should not be sign up', async () => {
    await request(app)
    .post('/users')
    .set('Type', 'email')
    .send({
        name: 'adnanaslama',
        email: 'adnanaslam4758@gmail.com',
        password: 'adnan123'
    }).expect()
})

//test 2
test('should user login', async () => {
    await request(app).post('/users/login').send({
        email: UserOne.email,
        password: UserOne.password
    }).expect(200)
})

//test 3
test('user should not login', async () => {
    await request(app).post('/users/login').send({
        email: UserOne.email,
        password: 'adnanaslm123'
    })
})

//test 4
test('should get user with token', async () => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${UserOne.tokens[0].token}`)
        .send()
        .expect(200)
})

//test 5
test('should  not get user with token', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})




//test 6
test('should not upload image', async () => {
    await request(app)
        .post('/users/me/avatar')
        // .set('Authorization', `Bearer ${UserOne.tokens[0].token}`)
        .attach('avatar', 'profile-pic.jpg')
        .expect(401)
})

//test 7
test('user should delete', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${UserOne.tokens[0].token}`)
        .send()
        .expect(200)
    // const user = await User.findById(userOneID)
    // expect(user).toBeNull()
})

//test 8
test('user should not delete', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

//test 9
test('should update user', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${UserOne.tokens[0].token}`)
        .send({
            name: 'adnanaaslamnnwaqar'
        }).expect(200)
    const user = await User.findById(UserOne._id)
    expect(user.name).toEqual('adnanaaslamnnwaqar')
})

//test 10
test('should not update user with invalid name/email/password', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${UserOne.tokens[0].token}`)
        .send({
            name: 'adnanaaslamnnwaqar1'
        }).expect(200)
    // const user = await User.findById(UserOne._id)
    // expect(user.name).toEqual('adnanaaslamnnwaqar')
})

//test 11
test('should not update user ', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${UserOne.tokens[0].token}`)
        .send({
            location: 'adnanaaslamwaqar'
        }).expect(400)
})

