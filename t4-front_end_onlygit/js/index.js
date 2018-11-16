'use strict';

const express = require('express');
const app = express();
const multer = require('multer');
const uploaded = require('./uploaded');

app.use(express.static('public'));
app.use('/uploads',express.static('uploads'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null,  Date.now() + '__' + file.originalname);
  }
})

const upload = multer({ storage: storage });

app.get('/', (req, res) => res.sendFile(__dirname + '/task_a.html') );

app.get('/ajax', (req, res) => res.sendFile(__dirname + '/task_b.html') );

app.get('/uploaded', (req, res) => {
  const page = uploaded.files();
  res.send(page);
});

app.post('/',upload.single('file'), (req, res) => {
  if(req.file) res.redirect('/node/uploaded');
});


app.listen(3000, () => console.log('Server running on localhost:3000.'));