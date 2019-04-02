
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Mhs = new Schema({

  nama:    {
    type    : String,
    require : true
  },
  nim:   {
    type: Number,
    require : true
  },
  jurusan:   {
    type: String,
    require : true
  },
  kelas:   {
    type    : String,
    require : true
  }
});

Mhs.path('nama').validate(function (v) {
  return ((v != "") && (v != null));
});

module.exports = mongoose.model('Mhs', Mhs);