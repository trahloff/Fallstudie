const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
      'extended': 'true'
    }))
    .use('/', require('./components/routes/dbRoutes.js'))

/* istanbul ignore if  */
if (require.main === module) app.listen(process.env.PORT || 8080)

module.exports = app
