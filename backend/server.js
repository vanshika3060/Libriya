/*

Authors:

- Sai Chand Kolloju
- Damandeep Kaur

*/

const express = require('express')
const { resolve } = require('path')
const connectDatabase = require('./config/db')
const defaultErrorHandler = require('./middlewares/errorHandler')
const fileUpload = require('express-fileupload')
require('dotenv').config()

connectDatabase()

const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(fileUpload())

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/books', require('./routes/bookRoutes'))
const searchBooksRoute = require('./routes/searchBooksRoutes')
app.use('/api/', searchBooksRoute)

const duesRoutes = require('./routes/duesRoutes')
app.use(duesRoutes)

app.use('/api/printRequests', require('./routes/printRequestRoutes'))

const studybookingroutes = require('./routes/studyroomroutes')
app.use('/api/', studybookingroutes)

const cartroute = require('./routes/cart/cartRoute')
app.use('/api/', cartroute)

// Set static assets path for use in production environment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve(__dirname, '../frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, '../frontend/build/index.html'))
  })
}

app.use(defaultErrorHandler)

const PORT = process.env.PORT || 4000
app.listen(PORT, console.log(`Server running on port ${PORT}`))
