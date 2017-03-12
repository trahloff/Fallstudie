/* ---------------------Require Dependencies that are used for all tests--------------------- */
const chai = require('chai').use(require('chai-http')) // TODO consider using superagent
const should = chai.should()
const path = require('path')
const restEndpoint = require('../app')
const dbUtil = require(path.join(__dirname, '../components/dbUtil'))

describe('REST', () => {
  const testBaseDocs = [
    {
      'id': '1',
      'name': 'testDoc0',
      'date': '01-01-2017'
    },
    {
      'id': '2',
      'name': 'testDoc1',
      'date': '01-01-2017'
    }
  ]

  const testInsertDocs = [
    {
      'id': '12345',
      'name': 'testDoc2',
      'date': '01-01-2017'
    },
    {
      'id': '12323445',
      'name': 'testDoc3',
      'date': '01-01-2017'
    }
  ]

  beforeEach(done => {
    dbUtil.flush(() => dbUtil.insert(testBaseDocs, (err, newDoc) => {
      (err === null).should.be.true
      done()
    }))
  })

  it('should return a function as server', done => {
    restEndpoint.should.be.a('function')
    done()
  })

  it('POST /hello should return input name', done => {
    let user = 'werner'
    chai.request(restEndpoint)
            .post('/hello')
            .set('content-type', 'application/json')
            .send({
              name: user
            })
            .end((err, res) => {
              res.should.have.status(200)
              res.text.should.be.a('string')
              res.text.should.be.eql(user)
              done()
            })
  })

  it('POST /InsertDocument with single Doc should insert Doc and return DB Entry', done => {
    chai.request(restEndpoint)
          .post('/InsertDocument')
          .set('content-type', 'application/json')
          .send({
            doc: testInsertDocs[0]
          })
          .end((err, res) => {
            res.should.have.status(200)
            res.should.be.an('object')
            const payload = res.body
            payload.id.should.be.eql(testInsertDocs[0].id)
            payload.name.should.be.eql(testInsertDocs[0].name)
            payload._id.should.be.a('string')
            done()
          })
  })

  it('POST /InsertDocument with multiple Docs should insert Doc and return DB Entry', done => {
    chai.request(restEndpoint)
        .post('/InsertDocument')
        .set('content-type', 'application/json')
        .send({
          doc: testInsertDocs
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.an('object')
          const payload = res.body
          payload.length.should.be.eql(testInsertDocs.length)
          payload.every((el, i, arr) => {
            return (el.id.should.be.eql(testInsertDocs[i].id) &&
                   el.name.should.be.eql(testInsertDocs[i].name) &&
                   el._id.should.be.a('string')
            )
          }).should.be.eql(true)
          done()
        })
  })

  it('GET /GetSingleDocument should return single DB Entry', done => {
    chai.request(restEndpoint)
        .get('/GetSingleDocument')
        .set('content-type', 'application/json')
        .send({
          'date': '01-01-2017'
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.an('object')
          const payload = res.body
          payload.should.be.an('object')
          payload.should.not.be.an('array')
          done()
        })
  })

  it('GET /GetMultipleDocuments should return single DB Entry', done => {
    chai.request(restEndpoint)
        .get('/GetMultipleDocuments')
        .set('content-type', 'application/json')
        .send({
          'date': '01-01-2017'
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.an('object')
          const payload = res.body
          payload.should.not.be.an('object')
          payload.should.be.an('array')
          done()
        })
  })
})
