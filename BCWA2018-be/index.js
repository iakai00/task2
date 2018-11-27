'use strict';
require('dotenv').config();
const express = require('express');
const db = require('./modules/database');
const resize = require('./modules/resize');
const exif = require('./modules/exif');

const http = require('http');
const https = require('https');
const fs = require('fs');

const multer = require('multer');
// const upload = multer({dest: 'public/uploads/'});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null,  Date.now() + '__' + file.originalname);
  }
})

const upload = multer({ storage: storage });

const sslkey = fs.readFileSync('C:/Apache24/bin/blarg.key');
const sslcert = fs.readFileSync('C:/Apache24/bin/blarg.cert');

const opitions = {
  key: sslkey,
  cert: sslcert
};

const app = express();
app.use(express.static('public'));
// app.use(express.json())
// app.use(express.urlencoded({extended: false}))
app.set('trust proxy');

const connection = db.connect();


//create user
app.post('/user', upload.single(), (req, res) => {
  if(req.body.username && req.body.password) {
    const data = [req.body.username, req.body.password]
    db.insertUser(data, connection)
    .then(results => res.send(results))
    .catch(error => res.status(401).json(error));
  } else {
    res.send({message: 'Required fileds not submitted.'})
  }
})

//login user
app.post('/user/login', upload.single(), (req, res) => {
  if(req.body.username && req.body.password) {
    const data = [req.body.username, req.body.password]
    db.logIn(data, connection)
    .then(token => res.send({'message': 'Logged in successfully', 'token':token}))
    .catch(error => res.staut(401).json(error));
  } else {
    res.send({message: 'Required fileds not submitted.'})
  }
});

//logout user
app.post('/user/logout', (req, res) => {
  const token = req.headers['x-access-token'];
  if(!token) return res.send({message: 'Unautherize access. Not logged in.'});
  db.logOut(token)
  .then(message => res.send(message))
  .catch(error => res.staut(401).json(error));
});


//upload with multer
app.post('/upload', upload.single('mediafile'));

// create thumbnail
app.post('/upload', (req, res, next) => {
  resize.doResize(req.file.path, 300, './public/thumbs/' + req.file.filename + '_thumb', next);
})


//create medium image
app.post('/upload', (req, res, next) => {
  resize.doResize(req.file.path, 640, './public/medium/' + req.file.filename + '_medium', next);
});

//get coordinates
app.post('/upload', (req, res, next) => {
  exif.getCoordinates(req.file.path)
  .then(coords => {
    req.coordinates = coords;
    return next();
  })
  .catch(error => {
    console.log(error.message);
    req.coordinates = {'lat': '', 'lng': ''};
    return next();
  });

})


// insert to database
app.post('/upload', (req, res, next) => {
  const data = [
    req.body.category,
    req.body.title,
    req.body.details,
    req.coordinates,
    req.file.filename + '_thumb',
    req.file.filename + '_medium',
    req.file.filename
  ];
  db.insertMedia(data, connection)
  .then(results => {
    req.imageId = results.insertId;
    return next();
  })
  .catch(error => {
    console.log(error);
    return next();
  });
});

//return json data of uploaded image (Display updated data on the frontend)
app.post('/upload',(req, res, next) => {
  const jsonData = {
    id: req.imageId,
    mimeType: req.file.mimetype,
    url: req.file.path.replace(/^public/g,'/node/')
  }
  res.send(jsonData);
});

//update media
app.post('/update/',
    upload.single('mediafile'),
    (req, res, next) => {
      resize.doResize(req.file.path, 300, './public/thumbs/' + req.file.filename + '_thumb', next);
    },
    (req, res, next) => {
      resize.doResize(req.file.path, 640, './public/medium/' + req.file.filename + '_medium', next);
    },
    (req, res, next) => {
      exif.getCoordinates(req.file.path)
      .then(coords => {
        req.coordinates = coords;
        return next();
      })
      .catch(error => {
        console.log(error.message);
        req.coordinates = {'lat': '', 'lng': ''};
        return next();
      });
    },
    (req, res) =>{
      const token = req.headers['x-access-token'];
      if(!token) return res.send({message: 'Unautherize access.'});
      db.userIsLogged(token)
      .then(userData => {
        const data = [
          req.body.category,
          req.body.title,
          req.body.details,
          req.coordinates,
          req.file.filename + '_thumb',
          req.file.filename + '_medium',
          req.file.filename,
          req.body.media_id];
        db.updateMedia(data, connection)
        .then(results => {
          const jsonData = {
            id: req.body.media_id,
            mimeType: req.file.mimetype,
            url: req.file.path.replace(/^public/g,'/node/'),
            updated: true
          }
          res.send(jsonData);
        })
        .catch(error => res.status(401).json(error));
      })
      .catch(error => res.status(401).json(error));
    });

//delte media. Only authenticatd user. requirement access token and media id
app.delete('upload/:media_id', (req, res) => {
  const token = req.headers['x-access-token'];
  if(!token) return res.send({message: 'Unautherize access.'});
  db.userIsLogged(token)
  .then(userData => {
    const media_id = req.params.media_id;
    if(media_id) {
      db.deleteMedia([media_id], connection)
      .then(res.send({message: 'media deleted'}))
      .catch(error => res.status(401).json(error));
    } else {
      res.send({message: 'Must provide media id'});
    }
  })
  .catch(error => res.status(401).json(error));
})

// app.listen(3000);

http.createServer((req, res) => {
  res.writeHead(302, {'Location': 'https://' + req.headers.host + '/node' + req.url});
  res.end();
}).listen(8000);

https.createServer(opitions, app).listen(3000);

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