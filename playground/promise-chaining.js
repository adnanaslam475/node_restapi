require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5e10fe8c7fed361050b27e98', { age: 23 }).then(user => {
//     console.log(user)

//     return User.countDocuments({ age: 23 })
// }).catch(e => {
//     console.log('error', e)
// })

const updateAgeandCount = async ( id,age ) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({age})
    return count
}

updateAgeandCount('5e124b896faf9811c43cd3cc', 89).then(count => {
    console.log( count)
}).catch(e => {
    console.log( e)
})