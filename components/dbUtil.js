const Datastore = require('nedb')
const path = require('path')
const db = new Datastore({
  filename: path.join(__dirname, './_mockData.db')
})

db.loadDatabase()

exports.insert = (doc, callback) => {
  db.insert(doc, callback)
}

exports.find = (query, callback) => {
  db.find(query, callback)
}

exports.findOne = (query, callback) => {
  db.findOne(query, callback)
}

exports.flush = (callback) => {
  db.remove({}, { multi: true }, callback)
}
