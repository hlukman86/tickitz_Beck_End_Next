const express = require("express");
const app = express()
const moviesRoute = require('./moviesRoute')
const bookingRoute = require('./bookingRoute')
const usersRoute = require('./usersRoute')
const authRoute = require('./authRoute')

app.use('/movies', moviesRoute)
app.use('/booking', bookingRoute)
app.use('/users', usersRoute)
app.use('/auth', authRoute)

module.exports = app

