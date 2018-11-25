'use strict';
require('dotenv').config();
const express = require('express');
const db = require('./modules/database');
const resize = require('./modules/resize');
const exif = require('./modules/exif');

const multer = require('multer');
const upload = multer({dest: 'public/uploads/'});

const app = express();

const connection = db.connect();

const cb = (result, res) => {
  console.log(result);
  res.send(result);
};

app.use(express.static('public'));

// respond to post and save file
app.post('/upload', upload.single('mediafile'), (req, res, next) => {
  next();
});

// create thumbnail
app.use('/upload', (req, res, next) => {
  resize.doResize(req.file.path, 300,
      './public/thumb/' + req.file.filename + '_thumb', next);
});

// create medium image
app.use('/upload', (req, res, next) => {
  resize.doResize(req.file.path, 640,
      './public/medium/' + req.file.filename + '_medium', next);
});

// get coordinates
app.use('/upload', (req, res, next) => {
  exif.getCoordinates(req.file.path).then(coords => {
    req.coordinates = coords;
    next();
  });
});

// insert to database
app.use('/upload', (req, res, next) => {
  const data = [
    req.body.category,
    req.body.title,
    req.body.details,
    req.file.filename + '_thumb',
    req.file.filename + '_medium',
    req.file.filename,
    req.coordinates,
  ];
  db.insert(data, connection, next);
});

// get updated data form database and send to client
app.use('/upload', (req, res) => {
  db.select(connection, cb, res);
});

app.listen(3000);

// *********************
// esimerkkejä:
/*
app.get('/', (req, res) => {
  console.log(req.ip);
  console.log(req.query.myParam);
  res.send('ok 1');
});

app.get('/path1/:param1', (req, res) => {
  console.log(req.params.param1);
  res.send('ok 2');
});

app.get(['/path2', '/path3', '/path4'], (req, res) => {
  console.log(req);
  res.send('ok 3');
});

app.use('/json', (req, res, next) => {
  console.log('Middleware tässä');
  next();
});

app.get('/json', (req, res) => {
  const objekti = {
    id: 1,
    name: 'My response',
  };
  res.send(objekti);
});
*/