require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

// initialize app
const app = express()

const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')

// middlewares
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
        console.log("Connected to db & listening on port 4000")
    })
})
.catch((err)=> {
    console.log(err)
})
