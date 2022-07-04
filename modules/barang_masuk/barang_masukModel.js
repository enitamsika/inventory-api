var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var barang_masukSchema = new Schema({
	'kode_barang' : String,
	'nama_barang' : String,
	'jumlah' : Number,
	'satuan' : String
});

module.exports = mongoose.model('barang_masuk', barang_masukSchema);
