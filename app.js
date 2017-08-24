'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8082

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
      'extended': 'true'
    }))
    .use('/', require('./components/routes/dbRoutes.js'))

/* istanbul ignore if  */
if (require.main === module) app.listen(() => console.log(PORT))

module.exports = app
