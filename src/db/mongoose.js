const mongoose = require('mongoose')

mongoose.connect(`${process.env.CONNECTION_STRING}`,
    {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })