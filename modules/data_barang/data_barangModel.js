var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var data_barangSchema = new Schema({
	'kode_barang' : String,
	'nama_barang' : String,
	'barang_masuk' : Number,
	'barang_keluar' : Number,
	'stock' : Number,
	'satuan' : String
});

module.exports = mongoose.model('data_barang', data_barangSchema);
