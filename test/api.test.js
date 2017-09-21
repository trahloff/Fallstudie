'use strict'

/* ---------------------Require Dependencies that are used for all tests--------------------- */
const chai = require('chai').use(require('chai-http')) // TODO consider using superagent
const should = chai.should()
const path = require('path')
const restEndpoint = require('../app')
const dbUtil = require(path.join(__dirname, '../components/dbUtil'))

describe('REST', () => {
  const testBaseDocs = [ {
    'id': '1',
    'name': 'testDoc0',
    'date': '01-01-2017'
  }, {
    'id': '2',
    'name': 'testDoc1',
    'date': '01-01-2017'
  } ]

  const testInsertDocs = [ {
    'id': '12345',
    'name': 'testDoc2',
    'date': '01-01-2017'
  }, {
    'id': '12323445',
    'name': 'testDoc3',
    'date': '01-01-2017'
  } ]

  let docID = ''

  beforeEach(done => {
    dbUtil.flush(() => dbUtil.insert(testBaseDocs, (err, newDoc) => {
      (err === null).should.be.true
      done()
    }))
  })

  it('should return a server function', done => {
    restEndpoint.should.be.a('function')
    done()
  })

  it('GET /test should return greeting', done => {
    chai.request(restEndpoint)
            .get('/test')
            .send()
            .end((err, res) => {
              ;(err === null).should.be.true
              res.should.have.status(200)
              res.text.should.be.a('string')
              res.text.should.be.eql('<h1>Works.</h1>')
              done()
            })
  })

  it('POST /doc with single document should insert document and return DB Entry', done => {
    chai.request(restEndpoint)
          .post('/doc')
          .set('content-type', 'application/json')
          .send({
            doc: testInsertDocs[0]
          })
          .end((err, res) => {
            ;(err === null).should.be.true
            res.should.have.status(200)
            res.should.be.an('object')
            res.body.id.should.be.eql(testInsertDocs[0].id)
            res.body.name.should.be.eql(testInsertDocs[0].name)
            res.body._id.should.be.a('string')
            docID = res.body.id
            done()
          })
  })

  it('POST /doc with multiple Docs should insert Doc and return DB Entry', done => {
    chai.request(restEndpoint)
        .post('/doc')
        .set('content-type', 'application/json')
        .send({
          doc: testInsertDocs
        })
        .end((err, res) => {
          ;(err === null).should.be.true
          res.should.have.status(200)
          res.should.be.an('object')
          res.body.length.should.be.eql(testInsertDocs.length)
          res.body.every((el, i, arr) => {
            return (el.id.should.be.eql(testInsertDocs[i].id) &&
                   el.name.should.be.eql(testInsertDocs[i].name) &&
                   el._id.should.be.a('string')
            )
          }).should.be.eql(true)
          done()
        })
  })

  it('GET /doc/:id should return single DB entries', done => {
    chai.request(restEndpoint)
        .get(`/doc/${docID}`)
        .set('content-type', 'application/json')
        .send()
        .end((err, res) => {
          ;(err === null).should.be.true
          res.should.have.status(200)
          res.should.be.an('object')
          res.body.should.be.an('object')
          res.body.should.not.be.an('array')
          done()
        })
  })

  it('GET /doc should return all DB entries', done => {
    chai.request(restEndpoint)
        .get('/doc')
        .set('content-type', 'application/json')
        .send()
        .end((err, res) => {
          ;(err === null).should.be.true
          res.should.have.status(200)
          res.should.be.an('object')
          res.body.should.not.be.an('object')
          res.body.should.be.an('array')
          done()
        })
  })
})
