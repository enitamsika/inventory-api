var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var barang_keluarSchema = new Schema({
	'kode_barang' : String,
	'nama_pelanggan' : String,
	'jumlah_barang' : Number
});

module.exports = mongoose.model('barang_keluar', barang_keluarSchema);
