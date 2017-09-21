'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 80

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
      'extended': 'true'
    }))
    .use('/', require('./components/routes/dbRoutes.js'))

/* istanbul ignore if  */
if (require.main === module) app.listen(PORT, '0.0.0.0', () => console.log(PORT))

module.exports = app
