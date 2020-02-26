const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect("mongodb://127.0.0.1:27017/basis-task", {useNewUrlParser: true})
  .catch(err => console.error(err))


app.get("/", function(req, res) {
    res.send('success')
});
app.listen(8080, () => {
    console.log('Server started on port 8080')
})
