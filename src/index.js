const app=require('../src/app')
const port = process.env.PORT

app.listen(port, () => console.log(`server listen at ${port}`))



// taskkill /F /IM node.exe (adress already in use)