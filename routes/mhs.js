var Mhs = require('../models/mhs.js');

module.exports = function(app) {

  findAllMhs = function(req, res) {
    console.log("GET - /mhs");
    return Mhs.find(function(err, mhs) {
      if(!err) {
        return res.send(mhs);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };


  findById = function(req, res) {

    console.log("GET - /mhs/:id");
    return Mhs.findById(req.params.id, function(err, mhs) {

      if(!mhs) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        return res.send({ status: 'OK', mhs:mhs });
      } else {

        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };


  addMhs = function(req, res) {

    console.log('POST - /mhs');

    var mhs = new Mhs({
      nama:    req.body.nama,
      nim:    req.body.nim,
      jurusan:    req.body.jurusan,
      kelas:    req.body.kelas
    });

    mhs.save(function(err) {

      if(err) {

        console.log('Error while saving mhs: ' + err);
        res.send({ error:err });
        return;

      } else {

        console.log("Mhs created");
        return res.send({ status: 'OK', mhs:mhs });

      }

    });

  };


  updateMhs = function(req, res) {

    console.log("PUT - /mhs/:id");
    return Mhs.findById(req.params.id, function(err, mhs) {

      if(!mhs) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.nama != null) mhs.nama = req.body.nama;
      if (req.body.nim != null) mhs.nim = req.body.nim;
      if (req.body.jurusan != null) mhs.jurusan  = req.body.jurusan;
      if (req.body.kelas != null) mhs.kelas = req.body.kelas;

      return mhs.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', mhs:mhs });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }

        res.send(mhs);

      });
    });
  };


  deleteMhs = function(req, res) {

    console.log("DELETE - /mhs/:id");
    return Mhs.findById(req.params.id, function(err, mhs) {
      if(!mhs) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return mhs.remove(function(err) {
        if(!err) {
          console.log('Removed mhs');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }

 
  app.get('/mhs', findAllMhs);
  app.get('/mhs/:id', findById);
  app.post('/mhs', addMhs);
  app.put('/mhs/:id', updateMhs);
  app.delete('/mhs/:id', deleteMhs);

}