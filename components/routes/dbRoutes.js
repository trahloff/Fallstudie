'use strict'

const express = require('express')
const path = require('path')
const dbUtil = require(path.join(__dirname, '/../dbUtil'))
const api = express.Router()

api

    .get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '/../index.html'))
    })

    .post('/doc', (req, res) => {
      dbUtil.insert(req.body.doc, (err, r) => {
        err ? res.status(500).send(err) : res.send(r)
      })
    })

    .get('/doc/:id', (req, res) => {
      dbUtil.findOne(req.params.id, (err, r) => {
        err ? res.status(500).send(err) : res.send(r)
      })
    })

    .get('/doc', (req, res) => {
      dbUtil.find({}, (err, r) => {
        err ? res.status(500).send(err) : res.send(r)
      })
    })

    .delete('/doc', (req, res) => {
      dbUtil.flush((err, r) => {
        err ? res.status(500).send(err) : res.send(`${r} document${r === 1 ? '' : 's'} deleted`)
      })
    })

    .get('/test', (req, res) => {
      res.send('<h1>Works.</h1>')
    })

module.exports = api
