const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db
//connection to database 
MongoClient.connect('mongodb://assign:assign01@ds157288.mlab.com:57288/hash-assignment', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
//for display
app.get('/', (req, res) => {
  db.collection('age').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {age: result})
  })
})
//for adding
app.post('/age', (req, res) => {
  db.collection('age').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})
//for update
app.put('/age', (req, res) => {
  db.collection('age')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      ages: req.body.ages
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
//for delete
app.delete('/age', (req, res) => {
  db.collection('age').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('age got deleted')
  })
})