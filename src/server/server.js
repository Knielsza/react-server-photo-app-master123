var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const app = express()
const port = 3001
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

let files = []

app.get('/getFiles', (req, res) => {
  files = fs.readdirSync('./upload/')
  res.header("content-type", "application/json")
  console.log(files);
  res.send({ files })
})

app.post('/deleteSth' , (req, res) => {
  const id = req.body.id
  if (files.length >= id) {
    fs.rmSync('./upload/' + files[id], {force: true})
    res.send('')
  }
})

app.post('/deleteSelects', (req, res) => {
  const ids = req.body.ids
  ids.forEach((e) => {
    fs.rmSync('./upload/' + files[e], {force: true})
  });
  res.send('')
})

app.post('/newName', (req, res) => {
  const oldName = req.body.original
  const newName = req.body.new
  fs.renameSync('./upload/' + oldName, './upload/' + newName)
  res.send('')
})


app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})