const express = require('express')
const path = require('path')
const dbUtil = require(path.join(__dirname, '/../dbUtil'))

const api = express.Router()

api

    .post('/hello', (req, res) => {
      res.send(req.body.name)
    })

    .post('/InsertDocument', (req, res) => {
      dbUtil.insert(req.body.doc, (err, r) => {
        /* istanbul ignore else  */
        if (!err) {
          res.send(r)
        } else {
          res.status(500).json(err)
        }
      })
    })

    .get('/GetSingleDocument', (req, res) => {
      dbUtil.findOne(req.params.id, (err, r) => {
        /* istanbul ignore else  */
        if (!err) {
          res.send(r)
        } else {
          res.status(500).send(err)
        }
      })
    })

    .get('/GetMultipleDocuments', (req, res) => {
      dbUtil.find(req.params.id, (err, r) => {
        /* istanbul ignore else  */
        if (!err) {
          res.send(r)
        } else {
          res.status(500).send(err)
        }
      })
    })

module.exports = api
