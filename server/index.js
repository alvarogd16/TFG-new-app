// server/index.js
const path = require('path')
const express = require('express')
const app = express()

const router = require('./controllers/router.js')
const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')

const PORT = 3001

app.use(express.json())

app.use('/api', router)

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(notFound)
app.use(handleErrors)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});