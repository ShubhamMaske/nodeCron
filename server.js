const express = require('express')

const dotenv = require('dotenv').config()

const port = process.env.PORT || 3000

// require('./schedular1')
require('./schedular2')

const app = express()
app.use(express.json())

app.listen(port , () => {
    console.log(`server listening on port: ${port}`)
})

