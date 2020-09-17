require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndRemove('5e10fea57fed361050b27e99', { age: 23 }).then(task => {
//     console.log('no record found')
//     return User.countDocuments({ age: 23 })
// })
// .then(result=>{
//     console.log(result)
// })
// .catch(e => {c
//     console.log('error', e)
// })

const findAndDelete = async (id) => {
    await User.findByIdAndRemove(id)
    return
}
findAndDelete("5e124b5e6faf9811c43cd3c9").then(res => {
    console.log('koi error nhi', res)
}).catch(e => {
    console.log(e)
})