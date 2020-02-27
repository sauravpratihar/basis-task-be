const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const routes = require('./api')
require('dotenv').config()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true})
  .catch(err => console.error(err))

app.get("/test", function(req, res) {
    res.send('success')
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})

routes(express, app)