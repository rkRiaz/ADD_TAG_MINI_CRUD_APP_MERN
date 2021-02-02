const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const dataRoute = require('./routes/data')
// Cross Unblocker File..
const crossUnblocker = require('./middlewares/cros-unblocker');
// Custom Error Hanndler..
const errorHandler = require('./middlewares/error-handler');

const app = express()

// CROS Unblocker Middleware..
app.use(crossUnblocker.allowCross);
app.use(express.static('public')),  //make the public directory public
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Router Request Handeler..
app.use('/api/data', dataRoute)
//Error Handelar..
app.use(errorHandler.extra);


app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

const PORT = process.env.PORT || 8080
const MONGODB_URI = `mongodb://localhost:27017/aspyrer_assignment`


mongoose.connect(MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log(`Database Connected`)
        app.listen(PORT, () => {
            console.log(`Listening PORT: ${PORT}`)
        })
    })
    .catch(e => {
        console.log(e)
    })
