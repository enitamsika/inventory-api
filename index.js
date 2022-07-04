const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

const db_url = "mongodb://127.0.0.1:27017/inventory";

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

console.log(`Mencoba menghubungkan ke database, please wait...`);

mongoose.connect(db_url)
.then(() => {
    console.log('berhasil terhubung ke database !')
})
.catch((err) => {
    console.log(err);
});

const user = require('./modules/user/userRoutes');
const data_barang = require('./modules/data_barang/data_barangRoutes');
const barang_masuk = require('./modules/barang_masuk/barang_masukRoutes');
const barang_keluar = require('./modules/barang_keluar/barang_keluarRoutes');

app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.use('/api/auth', user); 
app.use('/api/data_barang', data_barang);
app.use('/api/barang_masuk', barang_masuk);
app.use('/api/barang_keluar', barang_keluar);

app.listen(2022, ()=> {
    console.log(`Server berhasil di jalankan !`);
});

